package com.ronge.voter;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface VoterRepository extends JpaRepository<Voter, Long> {
  @Query("select v.rowHash from Voter v where v.rowHash in :hashes")
  List<String> findExistingHashes(@Param("hashes") Collection<String> hashes);

  @Query("""
      select v from Voter v
      where (:district is null or v.district = :district)
        and (:part is null or v.partNo = :part)
        and (:name is null or lower(v.name) like lower(concat('%', cast(:name as string), '%')))
      order by v.district, v.partNo, v.serialNo
      """)
  Page<Voter> search(
      @Param("district") String district,
      @Param("part") String part,
      @Param("name") String name,
      Pageable pageable);
}