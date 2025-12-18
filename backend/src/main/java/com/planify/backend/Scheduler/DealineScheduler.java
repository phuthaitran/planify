package com.planify.backend.Scheduler;

import com.planify.backend.model.Plan;
import com.planify.backend.repository.PlanRepository;
import com.planify.backend.service.NotificationProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DealineScheduler {

        private final PlanRepository planRepository;

        private final NotificationProducer notificationProducer;

        @Scheduled(fixedRate = 60000)
        @Transactional
        public void scan() {

            LocalDateTime now = LocalDateTime.now();
            // reminder
            List<Plan> reminders = planRepository.findRemindersPlanWithDetails(now);

            for (Plan plan : reminders) {
                notificationProducer.sendReminder(plan);
                plan.setReminderSent(true);
            }

            // expired
            List<Plan> duePlans = planRepository.findDuePlansWithDetails(now);

            for (Plan plan : duePlans) {
                notificationProducer.sendDue(plan);
                plan.setExpiredSent(true);
            }

            planRepository.saveAll(reminders);
            planRepository.saveAll(duePlans);
        }
    }

