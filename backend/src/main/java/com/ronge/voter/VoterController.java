package com.ronge.voter;

import com.ronge.news.NewsRepository;
import com.ronge.problem.TeacherProblemRepository;
import com.ronge.voter.VoterService.AdminVoterPage;
import com.ronge.voter.VoterService.BulkPreview;
import com.ronge.voter.VoterService.BulkSaveRequest;
import com.ronge.voter.VoterService.BulkSaveResult;
import com.ronge.voter.VoterService.Preview;
import com.ronge.voter.VoterService.PreviewRow;
import com.ronge.voter.VoterService.SaveResult;
import com.ronge.voter.VoterService.VoterSearch;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class VoterController {
  private final VoterService voters;
  private final VoterRepository voterRows;
  private final TeacherProblemRepository problems;
  private final NewsRepository news;

  public VoterController(
      VoterService voters,
      VoterRepository voterRows,
      TeacherProblemRepository problems,
      NewsRepository news
  ) {
    this.voters = voters;
    this.voterRows = voterRows;
    this.problems = problems;
    this.news = news;
  }

  @GetMapping("/voters")
  VoterSearch search(@RequestParam(defaultValue = "") String name, @RequestParam(required = false) String district) {
    return voters.searchPublic(name, district);
  }

  @PostMapping("/admin/voters/preview")
  Preview preview(@RequestParam MultipartFile file) throws IOException {
    return voters.preview(file);
  }

  @PostMapping("/admin/voters")
  SaveResult save(@RequestBody List<PreviewRow> rows) {
    return voters.save(rows);
  }

  @PostMapping("/admin/voters/bulk-preview")
  BulkPreview bulkPreview(@RequestParam("files") List<MultipartFile> files) throws IOException {
    return voters.bulkPreview(files);
  }

  @PostMapping("/admin/voters/bulk-save")
  BulkSaveResult bulkSave(@RequestBody BulkSaveRequest request) {
    return voters.bulkSave(request.batches());
  }

  @GetMapping("/admin/voters")
  AdminVoterPage list(
      @RequestParam(required = false) String name,
      @RequestParam(required = false) String district,
      @RequestParam(required = false) String part,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "25") int pageSize
  ) {
    return voters.searchAdmin(name, district, part, page, pageSize);
  }

  @DeleteMapping("/admin/voters/{id}")
  void delete(@PathVariable Long id) {
    voters.delete(id);
  }

  @DeleteMapping("/admin/voters")
  void deleteAll() {
    voters.deleteAll();
  }

  @GetMapping("/admin/summary")
  Map<String, Long> summary() {
    return Map.of("problems", problems.count(), "news", news.count(), "voters", voterRows.count());
  }
}
