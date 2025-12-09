package com.planify.backend.service;

import com.planify.backend.dto.request.PlanRequest;
import com.planify.backend.mapper.PlanMapper;
import com.planify.backend.model.ForkedPlan;
import com.planify.backend.model.Plan;
import com.planify.backend.model.User;
import com.planify.backend.repository.ForkedPlanRepository;
import com.planify.backend.repository.PlanRepository;
import com.planify.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PACKAGE, makeFinal = true)
@Service
public class ForkedPlanService {
    ForkedPlanRepository forkedPlanRepository;
    UserRepository userRepository;
    PlanRepository planRepository;
    PlanMapper planMapper;
    PlanService planService;

    public void forkPlan(Integer userId, Integer planId) {
        User adopter =  userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Plan originalPlan =  planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found!"));

        if (originalPlan.getOwner().getId().equals(adopter.getId())) {
            throw new IllegalArgumentException("You cannot fork your plan!");
        }

        PlanRequest adoptedPlanRequest = planMapper.toRequest(originalPlan);
        adoptedPlanRequest.setOwnerId(adopter.getId());
        Plan adoptedPlan = planService.addPlan(adoptedPlanRequest);

        ForkedPlan forkedPlan = new ForkedPlan();
        forkedPlan.setOriginalPlan(originalPlan);
        forkedPlan.setAdoptedUser(adopter);
        forkedPlan.setAdoptedPlan(adoptedPlan);
        forkedPlanRepository.save(forkedPlan);
    }

    public void deleteForkedPlan(Integer userId, Integer planId) {
        forkedPlanRepository.deleteByAdoptedUserIdAndAdoptedPlanId(userId, planId);
    }
}
