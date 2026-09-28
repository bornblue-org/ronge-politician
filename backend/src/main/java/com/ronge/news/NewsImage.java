package com.ronge.news;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "news_image")
public class NewsImage {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(optional = false)
  @JoinColumn(name = "story_id")
  private NewsStory story;
  private String path;
  private int sortOrder;

  public Long getId() { return id; }
  public NewsStory getStory() { return story; }
  public void setStory(NewsStory story) { this.story = story; }
  public String getPath() { return path; }
  public void setPath(String path) { this.path = path; }
  public int getSortOrder() { return sortOrder; }
  public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
