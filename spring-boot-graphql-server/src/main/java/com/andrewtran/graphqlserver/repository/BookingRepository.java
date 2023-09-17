package com.andrewtran.graphqlserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.andrewtran.graphqlserver.model.BookingEntity;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.UUID;
import java.util.Date;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, UUID> {
  @Query("SELECT b FROM BookingEntity b WHERE b.user_id = :userId AND b.date >= :currentDate") // current date is smaller or equal end date
  List<BookingEntity> getBookingByUserIdAndCurrentDate(@Param("userId") String userId, @Param("currentDate") Date currentDate); 
}