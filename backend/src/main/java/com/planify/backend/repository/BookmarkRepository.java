package com.planify.backend.repository;

import com.planify.backend.model.Bookmark;
import com.planify.backend.model.Plan;
import com.planify.backend.model.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<@NonNull Bookmark, @NonNull Integer> {
    boolean existsByUserIdAndPlanId(Integer userId, Integer planId);
    void deleteByUserIdAndPlanId(Integer userId, Integer planId);

    @Query("SELECT bm.plan FROM Bookmark bm WHERE bm.user.id = :userId")
    List<Plan> findPlanByUserId(@Param("userId") Integer userId);

    @Query("SELECT bm.user FROM Bookmark bm WHERE bm.plan.id = :planId")
    List<User> findUserByPlanId(@Param("planId") Integer planId);
}
