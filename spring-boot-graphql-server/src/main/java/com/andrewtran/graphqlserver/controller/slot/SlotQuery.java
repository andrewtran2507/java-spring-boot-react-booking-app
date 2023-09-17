package com.andrewtran.graphqlserver.controller.slot;

import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;

import com.andrewtran.graphqlserver.model.SlotEntity;
import com.andrewtran.graphqlserver.service.SlotService;

import java.util.List;
import java.util.UUID;

@Controller
public class SlotQuery {

  @Autowired
	private SlotService slotService;
  
  @QueryMapping
	public List<SlotEntity> allSlots() {
		return slotService.getAllSlots();
	}

  @QueryMapping
	public SlotEntity slotById(@Argument UUID id) {
    return slotService.getSlotById(id);
  }

  @QueryMapping
	public Integer totalSlots() {
    return (int) slotService.countSlots();
  }

  @QueryMapping
	public List<SlotEntity> getSlotByUserIdAndCurrentDate(@Argument String userId, @Argument String currentDate) {
    return slotService.getSlotByUserIdAndCurrentDate(userId, currentDate);
  }

  @QueryMapping
	public List<SlotEntity> getSlotByCurrentDate(@Argument String currentDate) {
    return slotService.getSlotByCurrentDate(currentDate);
  }
}