package com.example.amigox.controllers;

import com.example.amigox.entities.Person;
import com.example.amigox.services.PersonService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PersonController {
    Gson gson = new Gson();
    @Autowired
    PersonService personService;

    @GetMapping("/person")
    private List<Person> getAllPersons() {
        return personService.getAllPersons();
    }

    @GetMapping("/person/{id}")
    private Person getPerson(@PathVariable("id") int id) {
        return personService.getPersonById(id);
    }

    @DeleteMapping("/person/{id}")
    private void deletePerson(@PathVariable("id") int id) {
        personService.delete(id);
    }

    @PostMapping("/person")
    private long savePerson(@RequestBody String request) {
        Person person = gson.fromJson(request, Person.class);
        personService.saveOrUpdate(person);
        return person.getId();
    }



}
