package com.planify.backend.mapper;

import com.planify.backend.dto.request.UserCreationRequest;
import com.planify.backend.dto.request.UserUpdateRequest;
import com.planify.backend.dto.response.UserResponse;
import com.planify.backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    //MapStruct sẽ tạo code để biến UserCreationRequest → User
    //Nếu hai class có field cùng tên → MapStruct tự map.
    User toUser(UserCreationRequest request);

    //Dùng để:
    //Chuyển entity User → thành UserResponse
    UserResponse toUserResponse(User user);

    //@MappingTarget User user = object đích cần update
    //UserUpdateRequest request = object nguồn
    //MapStruct sẽ map các field từ request vào user, nhưng KHÔNG tạo object mới — nó update trực tiếp vào object hiện có.
    void updateUser(@MappingTarget User user, UserUpdateRequest request );


}
