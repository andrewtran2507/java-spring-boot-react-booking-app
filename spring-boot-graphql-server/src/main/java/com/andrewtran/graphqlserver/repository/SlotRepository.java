package com.andrewtran.graphqlserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.andrewtran.graphqlserver.model.SlotEntity;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.UUID;
import java.util.Date;
import java.util.List;

@Repository
public interface SlotRepository extends JpaRepository<SlotEntity, UUID> {
  @Query("select s from SlotEntity s where s.user_id = :userId and s.end_date >= :currentDate") // current date is smaller or equal end date
  List<SlotEntity> getSlotByUserIdAndCurrentDate(@Param("userId") String userId, @Param("currentDate") Date currentDate);

  @Query("select s from SlotEntity s where s.end_date >= :currentDate")
  List<SlotEntity> getSlotByCurrentDate(@Param("currentDate") Date currentDate);
}