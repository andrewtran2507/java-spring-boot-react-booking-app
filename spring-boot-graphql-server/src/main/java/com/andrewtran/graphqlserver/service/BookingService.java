package com.andrewtran.graphqlserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andrewtran.graphqlserver.repository.BookingRepository;
import com.andrewtran.graphqlserver.model.BookingEntity;
import com.andrewtran.graphqlserver.utils.DateUtil;

import static com.andrewtran.graphqlserver.model.BookingModel.BookingInput;

import java.util.List;
import java.util.UUID;
import java.util.Date;
import java.io.*;

@Service
public class BookingService { 
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private DateUtil dateUtil;

    // Get all Bookings
    public List<BookingEntity> getAllBookings() {
      return bookingRepository.findAll();
    }

    // Get Booking by ID
    public BookingEntity getBookingById(UUID id) {
      return bookingRepository.getReferenceById(id);
    }

    // Count all booking
    public Integer countBookings() {
      return (int) bookingRepository.count();
    }

    // Get Booking List By User Id And Current Date
    public List<BookingEntity> getBookingByUserIdAndCurrentDate(String userId, String currentDate) { // MM-dd-yyyy" 
      Date current_date = dateUtil.parseDateData(currentDate);
      System.out.println(currentDate);
      System.out.println(userId);
      System.out.println(current_date);
      return bookingRepository.getBookingByUserIdAndCurrentDate(userId, current_date);
    }
    // Create a new booking
    public BookingEntity createBooking(BookingInput bookingInput) {
      Date date = dateUtil.parseDateData(bookingInput.date());
      BookingEntity bookingItem = new BookingEntity();      
      bookingItem.setDayOfWeek(bookingInput.day_of_week());
      bookingItem.setStartTime(bookingInput.start_time());
      bookingItem.setEndTime(bookingInput.end_time());
      bookingItem.setDate(date);
      bookingItem.setSlotId(bookingInput.slot_id());
      bookingItem.setUserId(bookingInput.user_id());
      System.out.println("bookingItem");
      System.out.println(bookingItem);
      return bookingRepository.save(bookingItem);
    }

    // Update booking
    public BookingEntity updateBooking(UUID id, BookingInput bookingInput) {
      System.out.println( "updateBooking ");
      System.out.println(id);
      System.out.println(bookingInput);
      BookingEntity existingBooking = bookingRepository.getReferenceById(id);
      if (existingBooking.getId() != null) {
        Date date = dateUtil.parseDateData(bookingInput.date());

        if (!existingBooking.getDayOfWeek().equals(bookingInput.day_of_week())) {
          existingBooking.setDayOfWeek(bookingInput.day_of_week());
        }
        if (!existingBooking.getStartTime().equals(bookingInput.start_time())) {
          existingBooking.setStartTime(bookingInput.start_time());
        }
        if (!existingBooking.getEndTime().equals(bookingInput.end_time())) {
          existingBooking.setEndTime(bookingInput.start_time());
        }
        if (existingBooking.getDate().compareTo(date) != 0) {
          existingBooking.setDate(date);
        }
        if (!existingBooking.getUserId().equals(bookingInput.user_id())) {
          existingBooking.setUserId(bookingInput.user_id());
        }
        if (!existingBooking.getSlotId().equals(bookingInput.slot_id())) {
          existingBooking.setSlotId(bookingInput.slot_id());
        }
        if (existingBooking.getTimeZone() != bookingInput.time_zone()) {
          existingBooking.setTimeZone(bookingInput.time_zone());
        }
        if (existingBooking.getIsActive() != bookingInput.is_active()) {
          existingBooking.setIsActive(bookingInput.is_active());
        }
        if (existingBooking.getStatus() != bookingInput.status()) {
          existingBooking.setStatus(bookingInput.status());
        }
        System.out.println(existingBooking);
        return bookingRepository.save(existingBooking);
      }
      return null;
    }

    // Delete all Bookings
    public void deleteAllBookings() {
        bookingRepository.deleteAll();
    }

    // Delete booking
    public void deleteBooking(UUID id) {
        bookingRepository.deleteById(id);
    }
    


    // Other business logic related to Bookings
}