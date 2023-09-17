package com.andrewtran.graphqlserver.model;

import java.util.UUID;
import jakarta.persistence.*;
import java.util.Date;

// Slot
//  id: String!
// 	day_of_week: String!
//  start_time: String!
// 	end_time: String!
// 	from_date: String!
// 	end_date: String!
// 	user_id: String!
// 	time_zone: Int!
// 	step: Int!
// 	status: Boolean

@Entity
@Table(name = "slots")
public class SlotEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "day_of_week", nullable = false)
    private String day_of_week;

    @Column(name = "start_time", nullable = false)
    private String start_time;

    @Column(name = "end_time", nullable = false)
    private String end_time;

    @Column(name = "from_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date from_date;

    @Column(name = "end_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date end_date;

    @Column(name = "user_id", nullable = false) // provider id
    private String user_id;

    @Column(name = "time_zone", nullable = false) // default VN 7
    private Integer time_zone = 7;

    @Column(name = "step", nullable = false) // default 15 mins = 450000 milliseconds
    private Integer step = 450000;

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

    public Date getFromDate() {
      return from_date;
    }

    public void setFromDate(Date from_date) {
        this.from_date = from_date;
    }

    public Date getEndDate() {
      return end_date;
    }

    public void setEndDate(Date end_date) {
        this.end_date = end_date;
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

    public Integer getStep() {
      return step;
    }

    public void setStep(Integer step) {
        this.step = step;
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