package com.planify.backend.repository;

import com.planify.backend.model.Follow;
import com.planify.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    // Get all followers (User objects) of a given user id using JPQL
    @Query("select f.follower from Follow f where f.following.id = :userId")
    List<User> findFollowersByUserId(@Param("userId") Long userId);

    // Get all users that given user is following
    @Query("select f.following from Follow f where f.follower.id = :userId")
    List<User> findFollowingByUserId(@Param("userId") Long userId);

    // existence check
    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);

    // delete/unfollow
    void deleteByFollowerIdAndFollowingId(Long followerId, Long followingId);
}
