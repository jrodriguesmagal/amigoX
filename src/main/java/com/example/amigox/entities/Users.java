package com.example.amigox.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;

@Entity
public class Users{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;


    private int age;

    @Column(unique=true)
    private String emailId;

    private  String password;

    public Users(Users user) {
        this.emailId = user.getEmailId();
        this.name = user.getName();
        this.age = user.getAge();
        this.password = new BCryptPasswordEncoder().encode(user.getPassword());
    }

    public Users() {

    }

    public long getId() {
        return this.id;
    }

    public int getAge() {
        return this.age;
    }
    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
       this.name = name;
    }

    public void setPassword(String password) {
        this.password = new BCryptPasswordEncoder().encode(password);
    }

    public String getPassword() {
        return this.password;
    }

    public void setEmailId(String emailId){
        this.emailId = emailId;
    }
    public String getEmailId() {
        return this.emailId;
    }
}
