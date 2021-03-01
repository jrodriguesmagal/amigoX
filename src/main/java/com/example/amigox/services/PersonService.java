package com.example.amigox.services;

import com.example.amigox.entities.Person;
import com.example.amigox.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;

    public List<Person> getAllPersons() {
        List<Person> people = new ArrayList<Person>();
        personRepository.findAll().forEach(person -> people.add(person));
        return people;
    }

    public Person getPersonById(long id) {
        return personRepository.findById(id).get();
    }

    public void saveOrUpdate(Person person) {
        personRepository.save(person);
    }

    public void delete(long id) {
        personRepository.deleteById(id);
    }

}