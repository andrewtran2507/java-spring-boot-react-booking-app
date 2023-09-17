package com.andrewtran.graphqlserver.model;

import java.util.UUID;
import jakarta.persistence.*;
import java.util.Date;

// id: String!
// day_of_week: String
// start_time: String!
// end_time: String!
// date: String!
// user_id: String!
// slot_id: String!
// time_zone: Int!
// is_active: Boolean
// status: Boolean

@Entity
@Table(name = "bookings")
public class BookingEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "day_of_week", nullable = false)
  private String day_of_week;

  @Column(name = "start_time", nullable = false)
  private String start_time;

  @Column(name = "end_time", nullable = false)
  private String end_time;

  @Column(name = "date", nullable = false)
  @Temporal(TemporalType.DATE)
  private Date date; 

  @Column(name = "slot_id", nullable = false) // provider id
  private String slot_id;

  @Column(name = "user_id", nullable = false) // client id
  private String user_id;

  @Column(name = "time_zone", nullable = false) // default VN 7
  private Integer time_zone = 7;

  @Column(name = "is_active", nullable = false) // default = false
  private Boolean is_active = false;

  @Column(name = "status", nullable = false) // default = true
  private Boolean status = true;

  // Constructors, Getters, and Setters
  public UUID getId() {
      return id;
  }

  public void setId(UUID id) {
      this.id = id;
  }

  public String getDayOfWeek() {
    return day_of_week;
  }

  public void setDayOfWeek(String day_of_week) {
    this.day_of_week = day_of_week;
  }

  public String getStartTime() {
      return start_time;
  }

  public void setStartTime(String start_time) {
      this.start_time = start_time;
  }

  public String getEndTime() {
    return end_time;
  }

  public void setEndTime(String end_time) {
      this.end_time = end_time;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
      this.date = date;
  }
      
  public String getSlotId() {
    return slot_id;
  }

  public void setSlotId(String slot_id) {
      this.slot_id = slot_id;
  }

  public String getUserId() {
    return user_id;
  }

  public void setUserId(String user_id) {
      this.user_id = user_id;
  }

  public Integer getTimeZone() {
    return time_zone;
  }

  public void setTimeZone(Integer time_zone) {
      this.time_zone = time_zone;
  }

  public Boolean getIsActive() {
    return is_active;
  }

  public void setIsActive(Boolean is_active) {
      this.is_active = is_active;
  }

  public Boolean getStatus() {
    return status;
  }

  public void setStatus(Boolean status) {
      this.status = status;
  }

  @Override
  public String toString() {
    return "User [id=" + id + ", day_of_week=" + day_of_week + ", user_id=" + user_id + ", time_zone=" + time_zone.toString() + "]";
  }
}