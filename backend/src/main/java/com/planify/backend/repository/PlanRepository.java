package com.planify.backend.repository;

import com.planify.backend.model.Plan;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanRepository extends JpaRepository<@NonNull Plan, @NonNull Integer> {
    @Query("select p from Plan p where p.id = :planId")
    Plan findPlanById(@Param("planId") Integer planId);

    @Modifying
    @Query(value = "UPDATE plan SET duration = :duration WHERE id = :planId", nativeQuery = true)
    void updateDuration(@Param("planId") Integer planId, @Param("duration") Integer duration);
}
