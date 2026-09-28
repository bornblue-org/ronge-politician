package com.ronge.news;

import com.ronge.files.StoredFiles;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class NewsService {
  private final NewsRepository news;
  private final StoredFiles files;

  public NewsService(NewsRepository news, StoredFiles files) {
    this.news = news;
    this.files = files;
  }

  @Transactional(readOnly = true)
  public NewsPageResponse page(int page, int pageSize) {
    int safePage = Math.max(page, 1);
    int safeSize = Math.min(Math.max(pageSize, 1), 100);
    var result = news.findAllByOrderByStoryDateDesc(PageRequest.of(safePage - 1, safeSize));
    List<NewsResponse> items = result.getContent().stream().map(NewsResponse::from).toList();
    return new NewsPageResponse(items, safePage, safeSize, result.getTotalElements());
  }

  @Transactional(readOnly = true)
  public NewsResponse get(String id) {
    return NewsResponse.from(find(id));
  }

  @Transactional
  public NewsResponse create(
      String titleMr, String titleEn, String descriptionMr, String descriptionEn, LocalDate date,
      MultipartFile banner, List<MultipartFile> images
  ) throws IOException {
    requireText(titleMr, "Marathi title");
    requireText(titleEn, "English title");
    requireText(descriptionMr, "Marathi description");
    requireText(descriptionEn, "English description");
    if (date == null) {
      throw new IllegalArgumentException("Choose a date");
    }
    NewsStory story = new NewsStory();
    story.setId(UUID.randomUUID().toString());
    story.setTitleMr(titleMr.trim());
    story.setTitleEn(titleEn.trim());
    story.setDescriptionMr(descriptionMr.trim());
    story.setDescriptionEn(descriptionEn.trim());
    story.setStoryDate(date);
    story.setBanner(files.saveImage(banner));
    addImages(story, images);
    return NewsResponse.from(news.save(story));
  }

  @Transactional
  public NewsResponse update(
      String id, String titleMr, String titleEn, String descriptionMr, String descriptionEn, LocalDate date,
      MultipartFile banner, List<MultipartFile> images
  ) throws IOException {
    NewsStory story = find(id);
    if (titleMr != null && !titleMr.isBlank()) story.setTitleMr(titleMr.trim());
    if (titleEn != null && !titleEn.isBlank()) story.setTitleEn(titleEn.trim());
    if (descriptionMr != null && !descriptionMr.isBlank()) story.setDescriptionMr(descriptionMr.trim());
    if (descriptionEn != null && !descriptionEn.isBlank()) story.setDescriptionEn(descriptionEn.trim());
    if (date != null) story.setStoryDate(date);
    if (banner != null && !banner.isEmpty()) {
      String previous = story.getBanner();
      story.setBanner(files.saveImage(banner));
      files.deletePublic(previous);
    }
    addImages(story, images);
    return NewsResponse.from(story);
  }

  @Transactional
  public void delete(String id) {
    NewsStory story = find(id);
    files.deletePublic(story.getBanner());
    story.getImages().forEach(image -> files.deletePublic(image.getPath()));
    news.delete(story);
  }

  @Transactional
  public NewsResponse removeImage(String id, String filename) {
    NewsStory story = find(id);
    String path = "/api/files/" + filename;
    NewsImage image = story.getImages().stream()
        .filter(item -> path.equals(item.getPath()))
        .findFirst()
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found"));
    story.getImages().remove(image);
    files.deletePublic(path);
    return NewsResponse.from(story);
  }

  private void addImages(NewsStory story, List<MultipartFile> images) throws IOException {
    if (images == null) {
      return;
    }
    int order = story.getImages().size();
    for (MultipartFile image : images) {
      if (image == null || image.isEmpty()) {
        continue;
      }
      NewsImage row = new NewsImage();
      row.setStory(story);
      row.setPath(files.saveImage(image));
      row.setSortOrder(order++);
      story.getImages().add(row);
    }
  }

  private NewsStory find(String id) {
    return news.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "News not found"));
  }

  private void requireText(String value, String label) {
    if (value == null || value.isBlank()) {
      throw new IllegalArgumentException(label + " is required");
    }
  }

  public record TextPair(String mr, String en) {}

  public record NewsResponse(String id, String banner, TextPair title, TextPair description, List<String> images, String date) {
    static NewsResponse from(NewsStory story) {
      List<String> images = new ArrayList<>();
      for (NewsImage image : story.getImages()) {
        images.add(image.getPath());
      }
      return new NewsResponse(
          story.getId(),
          story.getBanner(),
          new TextPair(story.getTitleMr(), story.getTitleEn()),
          new TextPair(story.getDescriptionMr(), story.getDescriptionEn()),
          images,
          story.getStoryDate().toString());
    }
  }

  public record NewsPageResponse(List<NewsResponse> items, int page, int pageSize, long total) {}
}
