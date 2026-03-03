package com.planify.backend.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "username", unique = true, columnDefinition = "VARCHAR(255) COLLATE utf8mb4_unicode_ci")
    String username;

    String password;
    String email;
    String avatar;
    String bio;

    @Column(name="notificationenabled", columnDefinition = "ENUM('true', 'false')")
    String notification_enabled;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL , fetch = FetchType.EAGER)
    Set<UserRole> userRoles = new HashSet<>();

    @OneToMany(mappedBy = "following", cascade = CascadeType.REMOVE, orphanRemoval = true)
    Set<Follow> followings = new HashSet<>();

    @OneToMany(mappedBy = "follower", cascade = CascadeType.REMOVE, orphanRemoval = true)
    Set<Follow> followers = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    Set<Bookmark> planBookmarkers = new HashSet<>();

    @OneToMany(mappedBy = "adopter", cascade = CascadeType.REMOVE, orphanRemoval = true)
    Set<ForkedPlan> forkUsers = new HashSet<>();
}
