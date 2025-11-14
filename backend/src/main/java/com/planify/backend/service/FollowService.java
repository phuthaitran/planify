package com.planify.backend.service;

import com.planify.backend.model.Follow;
import com.planify.backend.model.User;
import com.planify.backend.repository.FollowRepository;
import com.planify.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;

@Service
public class FollowService {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    public FollowService(FollowRepository followRepository, UserRepository userRepository) {
        this.followRepository = followRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void follow(Long followerId, Long followeeId) {
        if (followerId.equals(followeeId)) {
            throw new IllegalArgumentException("Cannot follow yourself");
        }
        if (followRepository.existsByFollowerIdAndFollowingId(followerId, followeeId)) {
            return;
        }
        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new EntityNotFoundException("Follower not found"));
        User followee = userRepository.findById(followeeId)
                .orElseThrow(() -> new EntityNotFoundException("Followee not found"));

        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setFollowing(followee);
        followRepository.save(follow);
    }

    @Transactional
    public void unfollow(Long followerId, Long followingId) {
        followRepository.deleteByFollowerIdAndFollowingId(followerId, followingId);
    }

    @Transactional()
    public List<User> getFollowers(Long userId) {
        return followRepository.findFollowersByUserId(userId);
    }

    @Transactional()
    public List<User> getFollowing(Long userId) {
        return followRepository.findFollowingByUserId(userId);
    }
}
