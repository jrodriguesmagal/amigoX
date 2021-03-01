package com.example.amigox.services;

import com.example.amigox.entities.Person;
import com.example.amigox.entities.Users;
import com.example.amigox.repository.PersonRepository;
import com.example.amigox.repository.UsersRepository;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsersService {

    @Autowired
    UsersRepository usersRepository;

    public long create(Users user){
       Users userCreated = usersRepository.save(new Users(user));
        return userCreated.getId();
    }

    public Long auth(Users user){
        Users userResquest = usersRepository.findByEmailId(new Users(user).getEmailId());
        if(new BCryptPasswordEncoder().matches(user.getPassword(), userResquest.getPassword())){
            return userResquest.getId();
        }
        return null;
    }




}