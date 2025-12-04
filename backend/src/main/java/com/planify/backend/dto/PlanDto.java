package com.planify.backend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PlanDto {
    Integer id;
    String title;
    String description;
    Integer ownerId;
    String visibility;
    String status;
    int duration;

    public static PlanDto from(com.planify.backend.model.Plan plan) {
        if (plan == null) {
            return null;
        }
        return new PlanDto(plan.getId(), plan.getTitle(),
                plan.getDescription(), plan.getOwner().getId(),
                plan.getVisibility(), plan.getStatus(), plan.getDuration());
    }
}
