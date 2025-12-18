package com.planify.backend.repository;

import com.planify.backend.model.Plan;
import jakarta.persistence.LockModeType;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<@NonNull Plan, @NonNull Integer> {
    @Query("select p.id from Plan p where p.id = :planId")
    Plan findPlanById(@Param("planId") Integer planId);

    /** Reminder Plan Function
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Plan p " +
            "JOIN FETCH p.owner u " +
            // ĐIỀU KIỆN LỌC
            "WHERE p.reminderAt <= :now " +
            "AND p.reminderSent = FALSE")
    List<Plan> findRemindersPlanWithDetails(@Param("now") LocalDateTime now);

    /** Due Plan Function
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Plan p " +
            "JOIN FETCH p.owner u " +
            // ĐIỀU KIỆN LỌC
            "WHERE p.expiredAt <= :now " +
            "AND p.expiredSent = FALSE")
    List<Plan> findDuePlansWithDetails(@Param("now") LocalDateTime now);

    @Query("SELECT DISTINCT p FROM Plan p " +
            "JOIN p.tagPlans tp " +
            "JOIN tp.tag t " +
            "WHERE t.tagName IN :tagNames")
    List<Plan> findByTagNames(@Param("tagNames") List<String> tagNames);

}
