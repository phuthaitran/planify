package com.planify.backend.controller;

import com.planify.backend.model.User;
import com.planify.backend.dto.UserDto;
import com.planify.backend.service.FollowService;
import org.jspecify.annotations.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/follows")
public class UserFollowController {
    private final FollowService followService;

    public UserFollowController(FollowService followService) {
        this.followService = followService;
    }

    @PostMapping("{id}/follow/{targetId}")
    public ResponseEntity<@NonNull Void> follow(@PathVariable Long id, @PathVariable Long targetId) {
        followService.follow(id, targetId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{id}/unfollow/{targetId}")
    public ResponseEntity<@NonNull Void> unfollow(@PathVariable Long id, @PathVariable Long targetId) {
        followService.unfollow(id, targetId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("{id}/followers")
    public ResponseEntity<@NonNull List<UserDto>> getFollowers(@PathVariable Long id) {
        List<User> followers = followService.getFollowers(id);
        List<UserDto> dtos = followers.stream().map(UserDto::from).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("{id}/followings")
    public ResponseEntity<@NonNull List<UserDto>> getFollowing(@PathVariable Long id) {
        List<User> following = followService.getFollowing(id);
        List<UserDto> dtos = following.stream().map(UserDto::from).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}