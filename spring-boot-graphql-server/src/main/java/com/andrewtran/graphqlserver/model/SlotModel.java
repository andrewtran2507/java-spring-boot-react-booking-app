package com.andrewtran.graphqlserver.model;
import java.util.UUID;

public class SlotModel {
  public static record Slot(UUID id, String day_of_week, String start_time, String end_time, String from_date, String end_date, String user_id, Integer time_zone, Integer step, Boolean status) {}
  
  public static record SlotInput(String day_of_week, String start_time, String end_time, String from_date, String end_date, String user_id, Integer time_zone, Integer step, Boolean status) {}
}