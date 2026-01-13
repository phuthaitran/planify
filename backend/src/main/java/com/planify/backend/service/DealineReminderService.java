package com.planify.backend.Scheduler;

import com.planify.backend.model.Plan;
import com.planify.backend.repository.PlanRepository;
import com.planify.backend.service.NotificationProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DealineService{

    private final PlanRepository planRepository;
    private final NotificationProducer notificationProducer;

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void scan() {

        // Tạo Authentication giả lập với quyền ADMIN
        var auth = new UsernamePasswordAuthenticationToken(
                "system",
                null,
                List.of(new SimpleGrantedAuthority("SCOPE_ADMIN"))
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

        try {
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
                notificationProducer.sendDue(plan);       // @PreAuthorize trong method này sẽ pass
                plan.setExpiredSent(true);
            }

            planRepository.saveAll(reminders);
            planRepository.saveAll(duePlans);

        } finally {
            SecurityContextHolder.clearContext();  // Xóa Authentication sau khi task xong
        }
    }
}


