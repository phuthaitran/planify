package com.planify.backend.controller;

import com.planify.backend.model.User;
import com.planify.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public String add(@RequestBody User user) {
        userService.saveUser(user);
        return "User added successfully";
    }

    @GetMapping("/getall")
    public List<User> getAll() {
        return userService.getAllUser();
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        userService.removeUserById(id);
        return "User id " + id + " deleted successfully";
    }
}
