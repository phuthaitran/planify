package com.planify.backend.model;

import com.planify.backend.model.enums.PlanStatus;
import com.planify.backend.model.enums.PlanVisibility;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name="plan")
public class Plan {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
     Integer id;

    @Column(nullable = false, unique = true,  length = 120)
     String title;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    User owner;

    String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    PlanVisibility visibility;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    PlanStatus status;

    @Column(nullable = false)
    int duration;

    @CreatedDate
    LocalDateTime created_date;

    @LastModifiedDate
    LocalDateTime updated_date;

    String picture;
}
