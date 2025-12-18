package com.planify.backend.service;

import com.planify.backend.constant.NotificationTypeConst;
import com.planify.backend.dto.request.NotificationRequest;
import com.planify.backend.model.Notification;
import com.planify.backend.model.Plan;
import com.planify.backend.model.User;
import com.planify.backend.repository.NotificationRepository;
import com.planify.backend.repository.PlanRepository;
import com.planify.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationProducer {

    private final NotificationRepository notificationRepository;
    private final PlanRepository planRepository;
    private final NotificationService notificationService;

    /**
     *
     */
    @Transactional
    public void sendReminder(Plan plan) {

        User recipient = plan.getOwner();

        // Create REQUEST DTO
        NotificationRequest notificationRequest = NotificationRequest.builder()
                .recipientId(recipient.getId()) // USER ID
                .type(NotificationTypeConst.PLAN_DEADLINEREMINDER)
                .messageText(
                        "The deadline for plan \"" + plan.getDescription() + "\" is coming up"
                )
                 .planId(plan.getId())
                 .time(plan.getExpiredAt())
                .build();

        // Send Mail
        notificationService.sendEmailNotification(
                notificationRequest,
                plan,
                "PLAN DEADLINE REMINDER" // Chủ đề nếu có gửi email
        );
    }


    /**
     * Thông báo task đã đến hạn
     */
    @Transactional
    public void sendDue(Plan plan ) {

        Plan managedPlan = planRepository.findById(plan.getId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));
        User recipient = managedPlan.getOwner();
        // Create REQUEST DTO
        NotificationRequest notificationRequest = NotificationRequest.builder()
                .recipientId(recipient.getId()) // USER ID
                .type(NotificationTypeConst.PLAN_EXPIRED)
                .messageText(
                        "The deadline for plan \"" + plan.getDescription() + "\" is expired"
                )
                .planId(plan.getId())
                .time(plan.getExpiredAt())
                .build();
        // Send Mail
        notificationService.sendEmailNotification(
                notificationRequest,
                plan,
                "PLAN IS EXPIRED" // Chủ đề nếu có gửi email
        );
    }
}
