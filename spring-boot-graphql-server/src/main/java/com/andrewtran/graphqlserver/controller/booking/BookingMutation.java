package com.andrewtran.graphqlserver.controller.booking;


import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

import com.andrewtran.graphqlserver.model.BookingEntity;
import com.andrewtran.graphqlserver.service.BookingService;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;

import javassist.NotFoundException;
import java.util.UUID;

import static com.andrewtran.graphqlserver.model.BookingModel.*;

@Controller
public class BookingMutation {
	
	@Autowired
	private BookingService bookingService;

	
	@MutationMapping
	public BookingEntity createBooking(@Argument(name = "input") BookingInput bookingInput) {
    return bookingService.createBooking(bookingInput);
	}
	
	@MutationMapping	
	public BookingEntity updateBooking(@Argument UUID id, @Argument(name = "input") BookingInput bookingInput) throws NotFoundException {
    BookingEntity data = bookingService.updateBooking(id, bookingInput);
    if (data.getId().equals(id)) {
      return data;
    }
		throw new NotFoundException("Not found Booking to update!");
	}
}
