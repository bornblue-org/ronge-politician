package com.ronge.voter;

import com.ronge.voter.RollPdfParser.ParsedVoter;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class VoterService {
  private final VoterRepository voters;
  private final RollPdfParser parser = new RollPdfParser();

  public VoterService(VoterRepository voters) {
    this.voters = voters;
  }

  @Transactional(readOnly = true)
  public Preview preview(MultipartFile file) throws IOException {
    List<ParsedVoter> parsed = readPdf(file);
    List<String> hashes = parsed.stream().map(VoterService::hash).toList();
    Set<String> existing = existingHashes(hashes);
    Set<String> seen = new HashSet<>();
    List<PreviewRow> rows = new ArrayList<>();
    for (int index = 0; index < parsed.size(); index++) {
      ParsedVoter row = parsed.get(index);
      String code = hashes.get(index);
      boolean duplicate = existing.contains(code) || !seen.add(code);
      rows.add(PreviewRow.from(index, duplicate, row));
    }
    rows.sort(Comparator.comparing(PreviewRow::duplicate).reversed().thenComparingInt(PreviewRow::serial));
    long duplicateCount = rows.stream().filter(PreviewRow::duplicate).count();
    return new Preview(rows, duplicateCount, rows.size() - duplicateCount);
  }

  @Transactional
  public SaveResult save(List<PreviewRow> rows) {
    if (rows == null || rows.isEmpty()) {
      throw new IllegalArgumentException("Nothing to save");
    }
    List<String> hashes = new ArrayList<>();
    for (PreviewRow row : rows) {
      hashes.add(hash(row));
    }
    Set<String> existing = existingHashes(hashes);
    Set<String> accepted = new HashSet<>();
    List<Voter> entities = new ArrayList<>();
    int skipped = 0;
    for (int index = 0; index < rows.size(); index++) {
      String code = hashes.get(index);
      if (existing.contains(code) || !accepted.add(code)) {
        skipped++;
        continue;
      }
      entities.add(entity(rows.get(index), code));
    }
    try {
      voters.saveAll(entities);
    } catch (DataIntegrityViolationException ex) {
      throw new IllegalArgumentException("A row with the same district, part, and serial is already stored with different details.");
    }
    return new SaveResult(entities.size(), skipped);
  }

  @Transactional(readOnly = true)
  public VoterSearch searchPublic(String name, String district) {
    String query = name == null ? "" : name.trim();
    if (query.length() < 2) {
      throw new IllegalArgumentException("Type at least two letters of the name");
    }
    Page<Voter> page = voters.search(blankToNull(district), null, query, PageRequest.of(0, 30));
    List<PublicVoter> items = page.getContent().stream().map(PublicVoter::from).toList();
    return new VoterSearch(items, page.getTotalElements());
  }

  @Transactional(readOnly = true)
  public AdminVoterPage searchAdmin(String name, String district, String part, int page, int pageSize) {
    int safePage = Math.max(page, 1);
    int safeSize = Math.min(Math.max(pageSize, 1), 100);
    Page<Voter> result = voters.search(blankToNull(district), blankToNull(part), blankToNull(name), PageRequest.of(safePage - 1, safeSize));
    List<AdminVoter> items = result.getContent().stream().map(AdminVoter::from).toList();
    return new AdminVoterPage(items, safePage, safeSize, result.getTotalElements());
  }

  private List<ParsedVoter> readPdf(MultipartFile file) throws IOException {
    if (file == null || file.isEmpty()) {
      throw new IllegalArgumentException("Choose a PDF");
    }
    String filename = file.getOriginalFilename() == null ? "" : file.getOriginalFilename().toLowerCase();
    if (!filename.endsWith(".pdf")) {
      throw new IllegalArgumentException("Upload a PDF file");
    }
    return parser.parse(file.getInputStream());
  }

  private Set<String> existingHashes(List<String> hashes) {
    Set<String> existing = new HashSet<>();
    for (int start = 0; start < hashes.size(); start += 500) {
      List<String> chunk = hashes.subList(start, Math.min(start + 500, hashes.size()));
      if (!chunk.isEmpty()) {
        existing.addAll(voters.findExistingHashes(chunk));
      }
    }
    return existing;
  }

  private static String hash(ParsedVoter row) {
    return VoterHash.of(row.name(), row.relativeName(), row.address(), row.institute(), row.age(), row.gender(), row.epicNo(), row.district(), row.part(), row.serial());
  }

  private static String hash(PreviewRow row) {
    return VoterHash.of(row.name(), row.relativeName(), row.address(), row.institute(), row.age(), row.gender(), row.epicNo(), row.district(), row.part(), row.serial());
  }

  private static Voter entity(PreviewRow row, String code) {
    Voter voter = new Voter();
    voter.setDistrict(row.district());
    voter.setPartNo(row.part());
    voter.setSerialNo(row.serial());
    voter.setName(row.name());
    voter.setRelativeName(row.relativeName());
    voter.setAddress(row.address());
    voter.setInstitute(row.institute());
    voter.setAge(row.age());
    voter.setGender(row.gender());
    voter.setEpicNo(row.epicNo());
    voter.setRowHash(code);
    return voter;
  }

  private String blankToNull(String value) {
    if (value == null || value.isBlank() || "all".equals(value)) {
      return null;
    }
    return value.trim();
  }

  public record PreviewRow(
      int key,
      boolean duplicate,
      String name,
      String relativeName,
      String address,
      String institute,
      Integer age,
      String gender,
      String epicNo,
      String district,
      String part,
      int serial
  ) {
    static PreviewRow from(int key, boolean duplicate, ParsedVoter row) {
      return new PreviewRow(
          key, duplicate, row.name(), row.relativeName(), row.address(), row.institute(),
          row.age(), row.gender(), row.epicNo(), row.district(), row.part(), row.serial());
    }
  }

  public record Preview(List<PreviewRow> rows, long duplicateCount, long newCount) {}

  public record SaveResult(int saved, int skipped) {}

  public record PublicVoter(
      String name, String relativeName, String district, String part, String serial, String institute, String address
  ) {
    static PublicVoter from(Voter voter) {
      return new PublicVoter(
          voter.getName(), voter.getRelativeName(), voter.getDistrict(), voter.getPartNo(),
          String.valueOf(voter.getSerialNo()), voter.getInstitute(), voter.getAddress());
    }
  }

  public record VoterSearch(List<PublicVoter> items, long total) {}

  public record AdminVoter(
      String name, String relativeName, String district, String part, String serial,
      String address, String institute, Integer age, String gender, String epicNo
  ) {
    static AdminVoter from(Voter voter) {
      return new AdminVoter(
          voter.getName(), voter.getRelativeName(), voter.getDistrict(), voter.getPartNo(),
          String.valueOf(voter.getSerialNo()), voter.getAddress(), voter.getInstitute(),
          voter.getAge(), voter.getGender(), voter.getEpicNo());
    }
  }

  public record AdminVoterPage(List<AdminVoter> items, int page, int pageSize, long total) {}
}
