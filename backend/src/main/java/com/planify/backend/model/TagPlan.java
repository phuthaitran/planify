package com.planify.backend.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "tag_plan") // Tên bảng trung gian trong DB của bạn
public class TagPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "plan_id") // Cột plan_id trong DB
    private Plan plan;

    @ManyToOne
    @JoinColumn(name = "tag_id") // Cột tag_id trong DB
    private Tag tag;
}