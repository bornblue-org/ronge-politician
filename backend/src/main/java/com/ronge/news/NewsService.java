package com.ronge.news;

import com.ronge.files.StoredFiles;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
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
      String kind, String link, String titleMr, String titleEn, String descriptionMr, String descriptionEn,
      LocalDate date, MultipartFile banner, List<MultipartFile> images
  ) throws IOException {
    String type = kind == null ? "story" : kind.trim().toLowerCase();
    if (!type.equals("story") && !type.equals("link") && !type.equals("video")) {
      throw new IllegalArgumentException("Unknown news type");
    }
    boolean isStory = type.equals("story");
    requireText(titleMr, "Marathi title");
    requireText(titleEn, "English title");
    if (isStory) {
      requireText(descriptionMr, "Marathi description");
      requireText(descriptionEn, "English description");
    }
    if (date == null) {
      throw new IllegalArgumentException("Choose a date");
    }
    boolean hasBanner = banner != null && !banner.isEmpty();
    if (isStory && !hasBanner) {
      throw new IllegalArgumentException("Banner image is required");
    }
    NewsStory story = new NewsStory();
    story.setId(UUID.randomUUID().toString());
    story.setKind(type);
    story.setTitleMr(titleMr.trim());
    story.setTitleEn(titleEn.trim());
    story.setDescriptionMr(descriptionMr == null ? "" : descriptionMr.trim());
    story.setDescriptionEn(descriptionEn == null ? "" : descriptionEn.trim());
    story.setStoryDate(date);
    if (!isStory) {
      applyLink(story, link);
    }
    story.setBanner(hasBanner ? files.saveImage(banner) : defaultBanner(story));
    addImages(story, images);
    return NewsResponse.from(news.save(story));
  }

  @Transactional
  public NewsResponse update(
      String id, String link, String titleMr, String titleEn, String descriptionMr, String descriptionEn,
      LocalDate date, MultipartFile banner, List<MultipartFile> images
  ) throws IOException {
    NewsStory story = find(id);
    if (!"story".equals(story.getKind()) && link != null && !link.isBlank()) {
      String previousDefault = defaultBanner(story);
      applyLink(story, link);
      if (story.getBanner() == null || story.getBanner().equals(previousDefault)) {
        story.setBanner(defaultBanner(story));
      }
    }
    if (titleMr != null && !titleMr.isBlank()) story.setTitleMr(titleMr.trim());
    if (titleEn != null && !titleEn.isBlank()) story.setTitleEn(titleEn.trim());
    if (descriptionMr != null && !descriptionMr.isBlank()) story.setDescriptionMr(descriptionMr.trim());
    if (descriptionEn != null && !descriptionEn.isBlank()) story.setDescriptionEn(descriptionEn.trim());
    if (date != null) story.setStoryDate(date);
    if (banner != null && !banner.isEmpty()) {
      String previous = story.getBanner();
      story.setBanner(files.saveImage(banner));
      if (isUploaded(previous)) {
        files.deletePublic(previous);
      }
    }
    addImages(story, images);
    return NewsResponse.from(story);
  }

  @Transactional
  public void delete(String id) {
    NewsStory story = find(id);
    if (isUploaded(story.getBanner())) {
      files.deletePublic(story.getBanner());
    }
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

  private static boolean isUploaded(String path) {
    return path != null && path.startsWith("/api/files/");
  }

  private void applyLink(NewsStory story, String link) {
    requireText(link, "Link");
    URI uri;
    try {
      uri = new URI(link.trim());
    } catch (URISyntaxException e) {
      throw new IllegalArgumentException("Enter a valid link");
    }
    String scheme = uri.getScheme();
    String host = uri.getHost();
    if (host == null || scheme == null || !(scheme.equals("http") || scheme.equals("https"))) {
      throw new IllegalArgumentException("Enter a valid link starting with https://");
    }
    if ("video".equals(story.getKind()) && youtubeId(uri) == null) {
      throw new IllegalArgumentException("Enter a valid YouTube link");
    }
    if (link.trim().length() > 2000) {
      throw new IllegalArgumentException("The link is too long");
    }
    story.setLinkUrl(uri.toString());
    story.setSource(sourceName(host.toLowerCase()));
  }

  private String defaultBanner(NewsStory story) {
    if ("video".equals(story.getKind()) && story.getLinkUrl() != null) {
      try {
        String id = youtubeId(new URI(story.getLinkUrl()));
        if (id != null) {
          return "https://img.youtube.com/vi/" + id + "/hqdefault.jpg";
        }
      } catch (URISyntaxException ignored) {
        // no thumbnail available
      }
    }
    return "";
  }

  static String youtubeId(URI uri) {
    String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase();
    String path = uri.getPath() == null ? "" : uri.getPath();
    String id = null;
    if (host.equals("youtu.be")) {
      id = path.length() > 1 ? path.substring(1) : null;
    } else if (host.equals("youtube.com") || host.endsWith(".youtube.com")) {
      if (path.startsWith("/watch") && uri.getQuery() != null) {
        for (String part : uri.getQuery().split("&")) {
          if (part.startsWith("v=")) {
            id = part.substring(2);
          }
        }
      } else if (path.startsWith("/shorts/") || path.startsWith("/embed/") || path.startsWith("/live/")) {
        id = path.substring(path.indexOf('/', 1) + 1);
      }
    }
    if (id != null) {
      int slash = id.indexOf('/');
      if (slash >= 0) {
        id = id.substring(0, slash);
      }
    }
    return id != null && id.matches("[A-Za-z0-9_-]{6,20}") ? id : null;
  }

  private static String sourceName(String host) {
    if (host.contains("youtube") || host.equals("youtu.be")) return "YouTube";
    if (host.contains("facebook") || host.equals("fb.com") || host.equals("fb.watch") || host.endsWith(".fb.com")) return "Facebook";
    if (host.contains("instagram")) return "Instagram";
    if (host.contains("timesofindia") || host.contains("indiatimes")) return "Times of India";
    if (host.contains("lokmat")) return "Lokmat";
    if (host.contains("sakal")) return "Sakal";
    if (host.contains("loksatta")) return "Loksatta";
    if (host.contains("divyamarathi") || host.contains("bhaskar")) return "Divya Marathi";
    return host.startsWith("www.") ? host.substring(4) : host;
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

  public record NewsResponse(
      String id, String kind, String link, String source, String banner, TextPair title, TextPair description,
      List<String> images, String date
  ) {
    static NewsResponse from(NewsStory story) {
      List<String> images = new ArrayList<>();
      for (NewsImage image : story.getImages()) {
        images.add(image.getPath());
      }
      return new NewsResponse(
          story.getId(),
          story.getKind(),
          story.getLinkUrl(),
          story.getSource(),
          story.getBanner(),
          new TextPair(story.getTitleMr(), story.getTitleEn()),
          new TextPair(story.getDescriptionMr(), story.getDescriptionEn()),
          images,
          story.getStoryDate().toString());
    }
  }

  public record NewsPageResponse(List<NewsResponse> items, int page, int pageSize, long total) {}
}
