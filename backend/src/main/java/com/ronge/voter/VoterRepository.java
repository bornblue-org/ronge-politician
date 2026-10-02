package com.ronge.voter;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Locale;

public interface VoterRepository extends JpaRepository<Voter, Long> {
  @Query("select v.rowHash from Voter v where v.rowHash in :hashes")
  List<String> findExistingHashes(@Param("hashes") Collection<String> hashes);

  @Query("select v from Voter v where v.district = :district and v.partNo = :part and v.serialNo in :serials")
  List<Voter> findByDistrictAndPartAndSerialIn(
      @Param("district") String district,
      @Param("part") String part,
      @Param("serials") Collection<Integer> serials);

  int MAX_NAME_TOKENS = 4;

  /** Admin search: every word typed must appear anywhere in the name, in any order. */
  default Page<Voter> search(String district, String part, String name, Pageable pageable) {
    return searchTokens(district, part, name, false, pageable);
  }

  /** Public search: every word typed must match the start of a word in the name ("Tu Ro" finds "Tushar Sunil Rokade"). */
  default Page<Voter> searchByWordPrefix(String district, String part, String name, Pageable pageable) {
    return searchTokens(district, part, name, true, pageable);
  }

  private Page<Voter> searchTokens(String district, String part, String name, boolean wordPrefix, Pageable pageable) {
    String[] words = name == null || name.isBlank() ? new String[0] : name.trim().toLowerCase(Locale.ROOT).split("\\s+");
    String[] a = new String[MAX_NAME_TOKENS];
    String[] b = new String[MAX_NAME_TOKENS];
    for (int i = 0; i < MAX_NAME_TOKENS && i < words.length; i++) {
      a[i] = wordPrefix ? words[i] + "%" : "%" + words[i] + "%";
      b[i] = wordPrefix ? "% " + words[i] + "%" : a[i];
    }
    return searchByPatterns(district, part, a[0], b[0], a[1], b[1], a[2], b[2], a[3], b[3], pageable);
  }

  @Query("""
      select v from Voter v
      where (:district is null or v.district = :district)
        and (:part is null or v.partNo = :part)
        and (cast(:a1 as string) is null or lower(v.name) like cast(:a1 as string) or lower(v.name) like cast(:b1 as string))
        and (cast(:a2 as string) is null or lower(v.name) like cast(:a2 as string) or lower(v.name) like cast(:b2 as string))
        and (cast(:a3 as string) is null or lower(v.name) like cast(:a3 as string) or lower(v.name) like cast(:b3 as string))
        and (cast(:a4 as string) is null or lower(v.name) like cast(:a4 as string) or lower(v.name) like cast(:b4 as string))
      order by v.district, v.partNo, v.serialNo
      """)
  Page<Voter> searchByPatterns(
      @Param("district") String district,
      @Param("part") String part,
      @Param("a1") String a1, @Param("b1") String b1,
      @Param("a2") String a2, @Param("b2") String b2,
      @Param("a3") String a3, @Param("b3") String b3,
      @Param("a4") String a4, @Param("b4") String b4,
      Pageable pageable);
}