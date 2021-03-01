package com.example.amigox.entities;

import javax.persistence.*;

@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String partnerName;

    private long creationId;
    private int age;


    private String emailId;


    public long getId() {
        return this.id;
    }

    public long getCreationId() {
        return this.creationId;
    }


    public int getAge() {
        return this.age;
    }

    public String getName() {
        return this.name;
    }

    public String getPartnerName() {
        return this.partnerName;
    }
    public void setPartnerName(String partnerName) {
        this.partnerName = partnerName;
    }


}
