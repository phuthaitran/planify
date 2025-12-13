package com.planify.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "subtask")
public class Subtask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    Task task_id;

    @Column(nullable = false, unique = true,  length = 120)
    String title;

    @Column(nullable = false)
    String description;

    @Column(nullable = false)
    Integer duration;

    @Column(nullable = false, columnDefinition = "ENUM('incompleted', 'completed', 'cancelled')")
    String status;

    // New: optional scheduled date used for daily todo lists
    LocalDate scheduled_date;

    // Explicit camel-case accessors for code that expects Java-style property names
    public LocalDate getScheduledDate() {
        return this.scheduled_date;
    }

}
