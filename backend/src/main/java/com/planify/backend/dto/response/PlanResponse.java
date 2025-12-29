package com.planify.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PlanResponse {
    Integer id;
    String title;
    Integer ownerId;
    String visibility;
    String status;
    int duration;
    // Computed when returning the DTO
    Integer expectedTime;
    Integer actualTime;
    LocalDateTime created_date;
    LocalDateTime updated_date;
}
