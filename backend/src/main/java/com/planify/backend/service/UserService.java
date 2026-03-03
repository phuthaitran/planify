package com.planify.backend.service;

import com.planify.backend.dto.request.UserCreationRequest;
import com.planify.backend.dto.request.UserUpdateRequest;
import com.planify.backend.dto.response.UserResponse;
import com.planify.backend.model.Role;
import com.planify.backend.model.User;
import com.planify.backend.model.UserRole;
import com.planify.backend.exception.AppException;
import com.planify.backend.exception.ErrorCode;
import com.planify.backend.mapper.UserMapper;
import com.planify.backend.repository.RoleRepository;
import com.planify.backend.repository.UserRepository;
import com.planify.backend.repository.UserRoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.planify.backend.model.Role.RoleName;


import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PACKAGE, makeFinal = true)
@Slf4j
public class UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;
    RoleRepository roleRepository;
    UserRoleRepository userRoleRepository;

    public UserResponse createUser(UserCreationRequest request){
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        User user = userMapper.toUser(request);

        //Hash Password
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        // Handle roles
        Role roleUser = roleRepository.findByName(RoleName.USER)
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        UserRole userRole = UserRole.builder()
                .user(savedUser)
                .role(roleUser)
                .build();

        userRoleRepository.save(userRole);

        return buildUserResponse(savedUser);
    }

    private UserResponse buildUserResponse(User user){
        Set<String> roles = new HashSet<>();
        if(user.getUserRoles() != null) {
            roles = user.getUserRoles()
                    .stream()
                    .filter(ur -> ur != null && ur.getRole() != null && ur.getRole().getName() != null)
                    .map(ur -> ur.getRole().getName().name())
                    .collect(Collectors.toSet());
        }

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .avatar(user.getAvatar())
                .roles(roles)
                .build();
    }

    //@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public List<UserResponse> getUsers(){
        log.info("In method get User");
        return userRepository.findAll().stream()
                .map(this::buildUserResponse)
                .toList();
    }

    //@PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public UserResponse getUser(Integer id){
        return buildUserResponse(userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED))
        );
    }

    public UserResponse updateUser(Integer id, UserUpdateRequest request ){
        // Take current user info from SecurityContext
        var context = SecurityContextHolder.getContext();
        var authentication = context.getAuthentication();

        if(authentication == null || authentication.getName() == null){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        String currentUsername = authentication.getName();

        // Take the updated user from the database
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Check authorization: either that user or the admins
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("SCOPE_ADMIN"));

        boolean isOwner = user.getUsername().equals(currentUsername);

        // Otherwise decline
        if (!isAdmin && !isOwner) {
            log.warn("User {} attempted to update user {} without permission", currentUsername, id);
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        log.info("User {} is updating user {}", currentUsername, id);

        userMapper.updateUser(user , request);

        if(request.getPassword() != null && !request.getPassword().isEmpty()){
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return buildUserResponse(userRepository.save(user));
    }
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @Transactional
    public void deleteUser(Integer id){
        // Check if the user exists
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userRoleRepository.deleteAll(user.getUserRoles());

        userRepository.deleteById(id);

        log.info("User with id {} has been deleted", id);
    }

    public UserResponse getMyInfo(){
        var context = SecurityContextHolder.getContext();
        var authentication = context.getAuthentication();

        if(authentication == null || authentication.getName() == null){
            log.error("Authentication is null or name is null");
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        String name = authentication.getName();
        log.info("Getting my info for user: {}", name);

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return buildUserResponse(user);
    }

}
