package com.ronge.problem;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "teacher_problem")
public class TeacherProblem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String phone;
  private String district;
  private String school;
  private String topic;
  @Column(columnDefinition = "text")
  private String detail;
  private Instant createdAt;

  @PrePersist
  void onCreate() {
    createdAt = Instant.now();
  }

  public Long getId() { return id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getPhone() { return phone; }
  public void setPhone(String phone) { this.phone = phone; }
  public String getDistrict() { return district; }
  public void setDistrict(String district) { this.district = district; }
  public String getSchool() { return school; }
  public void setSchool(String school) { this.school = school; }
  public String getTopic() { return topic; }
  public void setTopic(String topic) { this.topic = topic; }
  public String getDetail() { return detail; }
  public void setDetail(String detail) { this.detail = detail; }
  public Instant getCreatedAt() { return createdAt; }
}
