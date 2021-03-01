package com.example.amigox.services;

import com.example.amigox.entities.Person;
import com.example.amigox.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SortService {

    @Autowired
    PersonRepository personRepository;

    public List<Person> getAllPersons(Long id) {
        List<Person> people = new ArrayList<Person>();
        personRepository.findAll().forEach(person -> people.add(person));

        List<Person> finalList = new ArrayList<>();

        for (Person element : people) {
            if(element.getCreationId() == id){
                finalList.add(element);
            }
        }
        return finalList;
    }


}
