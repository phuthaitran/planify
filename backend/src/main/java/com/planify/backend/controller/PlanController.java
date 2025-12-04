package com.planify.backend.controller;

import com.planify.backend.dto.PlanCreateRequest;
import com.planify.backend.dto.PlanDto;
import com.planify.backend.model.Plan;
import com.planify.backend.service.PlanService;
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
@RequestMapping("/api/plan")
public class PlanController {
    PlanService planService;

    @PostMapping("/add")
    public ResponseEntity<PlanDto> addPlan(@RequestBody PlanCreateRequest request) {
        Plan saved = planService.addPlan(request);
        return ResponseEntity.ok(PlanDto.from(saved));
    }

    @DeleteMapping("/{planId}/delete")
    public ResponseEntity<@NonNull Integer> deletePlan(@PathVariable Integer planId) {
        planService.removePlanById(planId);
        return ResponseEntity.ok(planId);
    }

    @GetMapping("/{planId}")
    public Plan getPlanById(@PathVariable("planId") Integer planId) {
        return planService.getPlan(planId);
    }

    @GetMapping("/getall")
    public List<PlanDto> getAllPlan() {
        return planService.getAllPlans().stream().map(PlanDto::from).toList();
    }
}
