package com.andrewtran.graphqlserver.controller.slot;


import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

import com.andrewtran.graphqlserver.model.SlotEntity;
import com.andrewtran.graphqlserver.service.SlotService;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;

import javassist.NotFoundException;
import java.util.UUID;

import static com.andrewtran.graphqlserver.model.SlotModel.*;

@Controller
public class SlotMutation {
	
	@Autowired
	private SlotService slotService;

	@MutationMapping
	public SlotEntity createSlot(@Argument(name = "input") SlotInput slotInput) {
    return slotService.createSlot(slotInput);
	}
	
	@MutationMapping	
	public SlotEntity updateSlot(@Argument UUID id, @Argument(name = "input") SlotInput slotInput) throws NotFoundException {
    SlotEntity data = slotService.updateSlot(id, slotInput);
    if (data.getId().equals(id)) {
      return data;
    }
		throw new NotFoundException("Not found Slot to update!");
	}
}
