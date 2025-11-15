package com.example.DatabaseSpringBoot.configuration;

import com.planify.backend.entity.User;
import com.planify.backend.enums.Role;
import com.planify.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE , makeFinal = true)
@Slf4j //Dùng để log
//Class này nó sẽ tự tạo cho mình một ADMIN khi Web được khởi chạy
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @Bean
    //Cái hàm này nó sẽ được khởi chạy mỗi khi ứng dụng của chúng ta start
    ApplicationRunner applicationRunner(UserRepository userRepository){
        return args -> {
            if(userRepository.findByUsername("admin").isEmpty()){
                var roles = new HashSet<String>();
                roles.add(Role.ADMIN.name());
                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin")) //Luôn để mật khẩu của admin là "admin"
                        .roles(roles)
                        .build();

                userRepository.save(user);
                log.warn("admin user has been created with default password: admin , please change it");
            }
        };
    }
}
