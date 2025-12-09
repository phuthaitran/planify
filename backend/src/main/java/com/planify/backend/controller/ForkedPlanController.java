package com.planify.backend.controller;

import com.planify.backend.dto.request.ApiResponse;
import com.planify.backend.service.ForkedPlanService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PACKAGE, makeFinal = true)
@RestController
@RequestMapping
public class ForkedPlanController {
    ForkedPlanService forkedPlanService;

    @PostMapping("/{userId}/fork/{planId}")
    ResponseEntity<ApiResponse<String>> forkPlan(@PathVariable Integer userId, @PathVariable Integer planId) {
        forkedPlanService.forkPlan(userId, planId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<String>builder()
                        .code(HttpStatus.CREATED.value())
                        .result("User " + userId + " forked"+ " plan " + planId)
                        .build());
    }
}
