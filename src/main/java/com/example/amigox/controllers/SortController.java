package com.example.amigox.controllers;

import com.example.amigox.MGSample;
import com.example.amigox.entities.EmailSender;
import com.example.amigox.entities.Person;
import com.example.amigox.services.PersonService;
import com.example.amigox.services.SortService;
import com.google.gson.Gson;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
public class SortController {


    Gson gson = new Gson();
    @Autowired
    SortService sortService;

    @PostMapping("/sort")
    private String sortGroup(@RequestBody String request) {
        EmailSender id = gson.fromJson(request, EmailSender.class);

        List<Person> list = sortService.getAllPersons(id.getId());
        List<Person> listAux = new ArrayList<>(list);

        int listSize = list.size();
        int random, count = 0;
        Person element, elementAux;

        while(list.size() != 0){
            random = (new Random().nextInt(list.size()));
            element = list.get(random);
           if(element.getId() != listAux.get(count).getId()){
               elementAux = listAux.get(count);
               elementAux.setPartnerName(element.getName());
              list.remove(element);
              count++;
           }
        }
        MGSample mail = new MGSample();
        for (Person email : listAux){
            try {
                JsonNode jsonNode = mail.sendSimpleMessage(id.getEmailSender(), email.getPartnerName(), email.getName());
                System.out.println(jsonNode.toString());
            } catch (UnirestException e) {
                e.printStackTrace();
            }
        }

        return gson.toJson(listAux);
    }

}
