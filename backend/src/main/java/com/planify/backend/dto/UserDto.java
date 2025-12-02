package com.planify.backend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDto {
    Integer id;
    String username;
    public static UserDto from(com.planify.backend.model.User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getUsername());
    }
}
