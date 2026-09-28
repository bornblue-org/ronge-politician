package com.ronge.news;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "news_story")
public class NewsStory {
  @Id
  private String id;
  @Column(columnDefinition = "text")
  private String titleMr;
  @Column(columnDefinition = "text")
  private String titleEn;
  @Column(columnDefinition = "text")
  private String descriptionMr;
  @Column(columnDefinition = "text")
  private String descriptionEn;
  private String banner;
  private LocalDate storyDate;
  private Instant createdAt;

  @OneToMany(mappedBy = "story", cascade = CascadeType.ALL, orphanRemoval = true)
  @OrderBy("sortOrder")
  private List<NewsImage> images = new ArrayList<>();

  @PrePersist
  void onCreate() {
    createdAt = Instant.now();
  }

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public String getTitleMr() { return titleMr; }
  public void setTitleMr(String titleMr) { this.titleMr = titleMr; }
  public String getTitleEn() { return titleEn; }
  public void setTitleEn(String titleEn) { this.titleEn = titleEn; }
  public String getDescriptionMr() { return descriptionMr; }
  public void setDescriptionMr(String descriptionMr) { this.descriptionMr = descriptionMr; }
  public String getDescriptionEn() { return descriptionEn; }
  public void setDescriptionEn(String descriptionEn) { this.descriptionEn = descriptionEn; }
  public String getBanner() { return banner; }
  public void setBanner(String banner) { this.banner = banner; }
  public LocalDate getStoryDate() { return storyDate; }
  public void setStoryDate(LocalDate storyDate) { this.storyDate = storyDate; }
  public Instant getCreatedAt() { return createdAt; }
  public List<NewsImage> getImages() { return images; }
}
