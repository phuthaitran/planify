package com.planify.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_id")
    Stage stage_id;

    @Column(nullable = false)
    String description;

    @Column(nullable = false)
    Integer duration;
}
