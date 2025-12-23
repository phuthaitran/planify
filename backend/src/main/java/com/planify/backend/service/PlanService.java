package com.planify.backend.service;

import com.planify.backend.dto.request.PlanRequest;
import com.planify.backend.dto.request.PlanUpdateRequest;
import com.planify.backend.dto.response.ProgressResponse;
import com.planify.backend.exception.AppException;
import com.planify.backend.exception.ErrorCode;
import com.planify.backend.model.Plan;
import com.planify.backend.model.Stage;
import com.planify.backend.model.TimeStatus;
import com.planify.backend.repository.PlanRepository;
import com.planify.backend.repository.StageRepository;
import com.planify.backend.repository.UserRepository;
import com.planify.backend.util.TimeCalculator;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;


@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PACKAGE, makeFinal = true)
@Service
public class PlanService {
    PlanRepository planRepository;
    UserRepository userRepository;
    StageRepository stageRepository;
    JwtUserContext jwtUserContext;

    public Plan addPlan(PlanRequest request) {
        Plan plan = new Plan();
        plan.setTitle(request.getTitle());
        plan.setDescription(request.getDescription());
        plan.setVisibility(request.getVisibility());
        plan.setStatus(request.getStatus());
        plan.setPicture(request.getPicture());

        plan.setOwner(userRepository.findById(jwtUserContext.getCurrentUserId())
                .orElseThrow(() -> new RuntimeException("Owner not found")));
        return planRepository.save(plan);
    }

    public void removePlanById(Integer planId) {
        planRepository.deleteById(planId);
    }

    public Plan getPlan(Integer planId) {
        return planRepository.findPlanById(planId);
    }

    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }


    // New: partial update for Plan
    public Plan updatePlanPartial(Integer planId, PlanUpdateRequest request) {
        Plan plan = planRepository.findPlanById(planId);
        if (plan == null) {
            throw new AppException(ErrorCode.PLAN_NOT_FOUND);
        }

        if (request.getTitle() != null) plan.setTitle(request.getTitle());
        if (request.getDescription() != null) plan.setDescription(request.getDescription());
        if (request.getPicture() != null) plan.setPicture(request.getPicture());
        if (request.getStatus() != null) plan.setStatus(request.getStatus());

        return planRepository.save(plan);
    }

    public ProgressResponse computeProgress(Integer planId) {
        Plan plan = planRepository.findPlanById(planId);
        if (plan == null) {
            throw new AppException(ErrorCode.PLAN_NOT_FOUND);
        }

        List<Stage> stages = stageRepository.findAllStage(planId);

        if (stages.isEmpty()) {
            return new ProgressResponse(
                    0,
                    plan.getDuration(),
                    TimeStatus.NOT_STARTED
            );
        }

        LocalDateTime startedAt = stages.stream()
                .map(Stage::getStarted_at)
                .filter(Objects::nonNull)
                .min(Comparator.naturalOrder())
                .orElse(null);
        if (startedAt == null) {
            return new ProgressResponse(
                    0,
                    plan.getDuration(),
                    TimeStatus.NOT_STARTED
            );
        }

        LocalDateTime completedAt = stages.stream()
                .map(Stage::getCompleted_at)
                .filter(Objects::nonNull)
                .max(Comparator.naturalOrder())
                .orElse(null);
        if (completedAt == null) {
            return new ProgressResponse(
                    0,
                    plan.getDuration(),
                    TimeStatus.IN_PROGRESS
            );
        }

        long actualDuration = TimeCalculator.calculateActualDays(
                startedAt,
                completedAt
        );
        TimeStatus status;

        if (actualDuration < plan.getDuration()) {
            status = TimeStatus.EARLY;
        } else if (actualDuration > plan.getDuration()) {
            status = TimeStatus.LATE;
        } else {
            status = TimeStatus.ON_TIME;
        }
        return ProgressResponse.builder()
                .expectedDays(plan.getDuration())
                .actualDays(actualDuration)
                .status(status)
                .build();
    }
}
