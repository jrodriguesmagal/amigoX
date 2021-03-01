package com.example.amigox.controllers;

import com.example.amigox.entities.Person;
import com.example.amigox.entities.Users;
import com.example.amigox.repository.UsersRepository;
import com.example.amigox.services.PersonService;
import com.example.amigox.services.UsersService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {
    Gson gson = new Gson();
    @Autowired
    UsersService usersService;

    @PostMapping("/users")
    private long createUser(@RequestBody String request) {

        Users user = gson.fromJson(request, Users.class);
        return usersService.create(user);
    }

    @PostMapping("/auth")
    private Long authUser(@RequestBody String request) {

        Users user = gson.fromJson(request, Users.class);
        return usersService.auth(user);
    }
}
