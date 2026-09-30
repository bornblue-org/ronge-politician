package com.ronge.news;

import com.ronge.news.NewsService.NewsPageResponse;
import com.ronge.news.NewsService.NewsResponse;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NewsController {
  private final NewsService news;

  public NewsController(NewsService news) {
    this.news = news;
  }

  @GetMapping("/news")
  NewsPageResponse page(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "9") int pageSize) {
    return news.page(page, pageSize);
  }

  @GetMapping("/news/{id}")
  NewsResponse one(@PathVariable String id) {
    return news.get(id);
  }

  @PostMapping("/admin/news")
  NewsResponse create(
      @RequestParam(defaultValue = "story") String kind,
      @RequestParam(required = false) String link,
      @RequestParam String titleMr,
      @RequestParam String titleEn,
      @RequestParam(required = false) String descriptionMr,
      @RequestParam(required = false) String descriptionEn,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
      @RequestParam(required = false) MultipartFile banner,
      @RequestParam(required = false) List<MultipartFile> images
  ) throws IOException {
    return news.create(kind, link, titleMr, titleEn, descriptionMr, descriptionEn, date, banner, images);
  }

  @PutMapping("/admin/news/{id}")
  NewsResponse update(
      @PathVariable String id,
      @RequestParam(required = false) String link,
      @RequestParam(required = false) String titleMr,
      @RequestParam(required = false) String titleEn,
      @RequestParam(required = false) String descriptionMr,
      @RequestParam(required = false) String descriptionEn,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
      @RequestParam(required = false) MultipartFile banner,
      @RequestParam(required = false) List<MultipartFile> images
  ) throws IOException {
    return news.update(id, link, titleMr, titleEn, descriptionMr, descriptionEn, date, banner, images);
  }

  @DeleteMapping("/admin/news/{id}")
  void delete(@PathVariable String id) {
    news.delete(id);
  }

  @DeleteMapping("/admin/news/{id}/images/{filename}")
  NewsResponse removeImage(@PathVariable String id, @PathVariable String filename) {
    return news.removeImage(id, filename);
  }
}
