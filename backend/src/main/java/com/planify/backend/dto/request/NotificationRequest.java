package com.planify.backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationRequest {
    LocalDateTime time;
    Integer planId;
    Integer recipientId;
    String type;
    String messageText;
}
