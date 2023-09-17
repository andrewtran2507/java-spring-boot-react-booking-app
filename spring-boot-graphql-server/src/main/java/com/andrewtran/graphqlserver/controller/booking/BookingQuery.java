package com.andrewtran.graphqlserver.controller.booking;

import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;

import com.andrewtran.graphqlserver.model.BookingEntity;
import com.andrewtran.graphqlserver.service.BookingService;

import java.util.List;
import java.util.UUID;
import java.util.Date;

@Controller
public class BookingQuery {

  @Autowired
	private BookingService bookingService;
  
  @QueryMapping
	public List<BookingEntity> allBookings() {
		return bookingService.getAllBookings();
	}

  @QueryMapping
	public BookingEntity bookingById(@Argument UUID id) {
    return bookingService.getBookingById(id);
  }

  @QueryMapping
	public Integer totalBookings() {
    return (int) bookingService.countBookings();
  }

  @QueryMapping
	public List<BookingEntity> getBookingByUserIdAndCurrentDate(@Argument String userId, @Argument String currentDate) {
    return bookingService.getBookingByUserIdAndCurrentDate(userId, currentDate);
  }
}