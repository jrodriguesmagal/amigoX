package com.example.amigox;

import java.io.File;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
public class MGSample {
    private static final String YOUR_DOMAIN_NAME = YOUR_DOMAIN_NAME; //TODO put your domain name here

    public static void main(String[] args) {

//        try {
//            JsonNode jsonNode = sendSimpleMessage();
//            System.out.println(jsonNode.toString());
//        } catch (UnirestException e) {
//            e.printStackTrace();
//        }

    }

    public static JsonNode sendSimpleMessage(String destinyEmail, String partnerSorted, String person) throws UnirestException {
        String str = "O amigo X do(a) "+ person +" é... " + partnerSorted + "!";
        HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/messages")
                .basicAuth("api", KEY)
                .field("from", "AmigoX no-reply-amigox@amigox.com")
                .field("to", destinyEmail)//
                .field("subject", "Seu Amigo X é...")
                .field("text", str)
                .asJson();

        return request.getBody();
    }
}