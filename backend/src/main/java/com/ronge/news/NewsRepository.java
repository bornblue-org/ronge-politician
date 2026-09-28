package com.ronge.news;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<NewsStory, String> {
  Page<NewsStory> findAllByOrderByStoryDateDesc(Pageable pageable);
}
