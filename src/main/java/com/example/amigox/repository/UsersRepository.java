package com.example.amigox.repository;

import com.example.amigox.entities.Person;
import com.example.amigox.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    List<Users> findByName(String name);
    Users findByEmailId(String emailId);
    List<Users> findAll();
}