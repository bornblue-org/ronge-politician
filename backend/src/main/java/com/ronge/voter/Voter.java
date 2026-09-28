package com.ronge.voter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "voter")
public class Voter {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String district;
  @Column(name = "part_no")
  private String partNo;
  @Column(name = "serial_no")
  private int serialNo;
  private String name;
  private String relativeName;
  @Column(columnDefinition = "text")
  private String address;
  private String institute;
  private Integer age;
  private String gender;
  private String epicNo;
  @Column(name = "row_hash", nullable = false, length = 64)
  private String rowHash;

  public Long getId() { return id; }
  public String getDistrict() { return district; }
  public void setDistrict(String district) { this.district = district; }
  public String getPartNo() { return partNo; }
  public void setPartNo(String partNo) { this.partNo = partNo; }
  public int getSerialNo() { return serialNo; }
  public void setSerialNo(int serialNo) { this.serialNo = serialNo; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getRelativeName() { return relativeName; }
  public void setRelativeName(String relativeName) { this.relativeName = relativeName; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public String getInstitute() { return institute; }
  public void setInstitute(String institute) { this.institute = institute; }
  public Integer getAge() { return age; }
  public void setAge(Integer age) { this.age = age; }
  public String getGender() { return gender; }
  public void setGender(String gender) { this.gender = gender; }
  public String getEpicNo() { return epicNo; }
  public void setEpicNo(String epicNo) { this.epicNo = epicNo; }
  public String getRowHash() { return rowHash; }
  public void setRowHash(String rowHash) { this.rowHash = rowHash; }
}
