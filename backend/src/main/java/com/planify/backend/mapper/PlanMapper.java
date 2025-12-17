package com.planify.backend.mapper;

import com.planify.backend.dto.request.PlanRequest;
import com.planify.backend.dto.request.PlanUpdateRequest;
import com.planify.backend.dto.response.PlanResponse;
import com.planify.backend.model.Plan;
import org.mapstruct.*;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlanMapper {
    @Mapping(source = "owner.id", target = "ownerId")
    PlanResponse toResponse(Plan plan);
    @Mapping(source = "owner.id", target = "ownerId")
    List<PlanResponse> toResponseList(List<Plan> plans);

    @Mapping(target = "owner", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updatePlan(PlanRequest request, @MappingTarget Plan targetPlan);
}
