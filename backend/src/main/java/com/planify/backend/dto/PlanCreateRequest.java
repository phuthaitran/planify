package com.planify.backend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PlanCreateRequest {
    String title;
    Integer ownerId;
    String description;
    String visibility;
    String status;
    int duration;
    String picture;
}
