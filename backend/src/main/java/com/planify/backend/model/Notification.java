package com.planify.backend.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name="notification")
public class Notification {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name="user_id", nullable = false)
    User recipient;

    @Column(name="message_text")
    String messageText;

    @Column(name="time", nullable = false)
    LocalDateTime time;
}
