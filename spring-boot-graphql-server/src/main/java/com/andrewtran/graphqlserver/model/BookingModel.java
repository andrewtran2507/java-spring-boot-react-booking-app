package com.andrewtran.graphqlserver.model;
import java.util.UUID;

public class BookingModel {
  public static record Booking(UUID id, String day_of_week, String start_time, String end_time, String date, String slot_id, String user_id, Integer time_zone, Boolean is_active, Boolean status) {}
  
  public static record BookingInput(String day_of_week, String start_time, String end_time, String date, String slot_id, String user_id, Integer time_zone, Boolean is_active, Boolean status) {}
}