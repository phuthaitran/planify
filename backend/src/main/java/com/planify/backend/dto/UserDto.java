package com.planify.backend.dto;

public class UserDto {
    private Long id;
    private String username;

    public UserDto() {}

    public UserDto(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public static UserDto from(com.planify.backend.model.User user) {
        return new UserDto(user.getId(), user.getUsername());
    }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return this.username = username; }
}
