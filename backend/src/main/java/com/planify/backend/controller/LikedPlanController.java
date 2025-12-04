package com.planify.backend.controller;

import com.planify.backend.dto.PlanDto;
import com.planify.backend.dto.UserDto;
import com.planify.backend.service.LikedPlanService;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PACKAGE, makeFinal = true)
@RestController
@RequestMapping("/api/likedplan")
public class LikedPlanController {
    LikedPlanService likedPlanService;

    @PostMapping("/{userId}/like/{planId}")
    public ResponseEntity<@NonNull String> likePlan(@PathVariable Integer userId, @PathVariable Integer planId) {
        likedPlanService.likePlan(userId, planId);
        return ResponseEntity.ok("UserId " + userId + " liked " + "planId " + planId);
    }

    @DeleteMapping("/{userId}/unlike/{planId}")
    public ResponseEntity<@NonNull String> unlikePlan(@PathVariable Integer userId, @PathVariable Integer planId) {
        likedPlanService.unlikePlan(userId, planId);
        return ResponseEntity.ok("UserId " + userId + " unliked " + "planId " + planId);
    }

    @GetMapping("/{userId}/likedplans")
    public List<PlanDto> getLikedPlans(@PathVariable Integer userId) {
        return likedPlanService.getLikedPlans(userId).stream().map(PlanDto::from).toList();
    }

    @GetMapping("/{planId}/likers")
    public List<UserDto> getLikers(@PathVariable Integer planId) {
        return likedPlanService.getLikers(planId).stream().map(UserDto::from).toList();
    }
}
