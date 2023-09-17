package com.andrewtran.graphqlserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andrewtran.graphqlserver.repository.SlotRepository;
import com.andrewtran.graphqlserver.model.SlotEntity;
import com.andrewtran.graphqlserver.model.SlotModel.SlotInput;
import com.andrewtran.graphqlserver.utils.DateUtil;

import static com.andrewtran.graphqlserver.model.SlotModel.SlotInput;

import java.util.List;
import java.util.UUID;
import java.util.Date;
// import java.io.*;

@Service
public class SlotService { 
    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private DateUtil dateUtil;

    // Get all Slots
    public List<SlotEntity> getAllSlots() {
      return slotRepository.findAll();
    }

    // Get Slot by ID
    public SlotEntity getSlotById(UUID id) {
      return slotRepository.getReferenceById(id);
    }

    // Count all slot
    public Integer countSlots() {
      return (int) slotRepository.count();
    }

    // Get Slot List By User Id And Current Date
    public List<SlotEntity> getSlotByUserIdAndCurrentDate(String userId, String currentDate) { // MM-dd-yyyy" 
      Date current_date = dateUtil.parseDateData(currentDate);
      return slotRepository.getSlotByUserIdAndCurrentDate(userId, current_date);
    }

    public List<SlotEntity> getSlotByCurrentDate(String currentDate) { // MM-dd-yyyy" 
      Date current_date = dateUtil.parseDateData(currentDate);
      return slotRepository.getSlotByCurrentDate(current_date);
    }

    // Create a new slot
    public SlotEntity createSlot(SlotInput slotInput) {
      Date fromDate = dateUtil.parseDateData(slotInput.from_date());
      Date endDate = dateUtil.parseDateData(slotInput.end_date());
      SlotEntity slotItem = new SlotEntity();      
      slotItem.setDayOfWeek(slotInput.day_of_week());
      slotItem.setStartTime(slotInput.start_time());
      slotItem.setEndTime(slotInput.end_time());
      slotItem.setFromDate(fromDate);
      slotItem.setEndDate(endDate);
      slotItem.setUserId(slotInput.user_id());
      slotItem.setStep(slotInput.step());
      System.out.println("slotItem");
      System.out.println(slotItem);
      return slotRepository.save(slotItem);
    }

    // Update slot
    public SlotEntity updateSlot(UUID id, SlotInput slotInput) {
      SlotEntity existingSlot = slotRepository.getReferenceById(id);
      if (existingSlot.getId() != null) {
        Date fromDate = dateUtil.parseDateData(slotInput.from_date());
        Date endDate = dateUtil.parseDateData(slotInput.end_date());


        if (!existingSlot.getDayOfWeek().equals(slotInput.day_of_week())) {
          existingSlot.setDayOfWeek(slotInput.day_of_week());
        }
        if (!existingSlot.getStartTime().equals(slotInput.start_time())) {
          existingSlot.setStartTime(slotInput.start_time());
        }
        if (!existingSlot.getEndTime().equals(slotInput.end_time())) {
          existingSlot.setEndTime(slotInput.start_time());
        }
        if (existingSlot.getFromDate().compareTo(fromDate) != 0) {
          existingSlot.setFromDate(fromDate);
        }
        if (existingSlot.getEndDate().compareTo(endDate) != 0) {
          existingSlot.setEndDate(endDate);
        }
        if (!existingSlot.getUserId().equals(slotInput.user_id())) {
          existingSlot.setUserId(slotInput.user_id());
        }
        if (existingSlot.getTimeZone() != slotInput.time_zone()) {
          existingSlot.setTimeZone(slotInput.time_zone());
        }
        if (existingSlot.getStep() != slotInput.step()) {
          existingSlot.setStep(slotInput.step());
        }
        if (existingSlot.getStatus() != slotInput.status()) {
          existingSlot.setStatus(slotInput.status());
        }
        System.out.println(existingSlot);
        return slotRepository.save(existingSlot);
      }
      return null;
    }

    // Delete all Slots
    public void deleteAllSlots() {
        slotRepository.deleteAll();
    }

    // Delete slot
    public void deleteSlot(UUID id) {
        slotRepository.deleteById(id);
    }
    


    // Other business logic related to Slots
}