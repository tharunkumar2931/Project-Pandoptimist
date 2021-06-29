package com.stackroute.chatservice.controller;

import com.stackroute.chatservice.model.MessageModel;
import com.stackroute.chatservice.model.UserStorage;
import com.stackroute.chatservice.model.VedioModel;
import com.stackroute.chatservice.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
public class MessageController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private Set<VedioModel> videoUser = new HashSet<>();

    private String[] colors = {"red", "green", "blue", "yellow", "orange", "violet"};
    private ChatService chatService;

    public MessageController(ChatService chatService, SimpMessagingTemplate simpMessagingTemplate) {
        this.chatService = chatService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/writing")
    @SendTo("/topic/writing")
    public String writing(String username) {
        return username + " is writing..";
    }

    @MessageMapping("/chat/{to}")
    public MessageModel sendMessage(@DestinationVariable String to, MessageModel message) {
        message.setDate(new Date().getTime());
        if (message.getType().equals("CONNECTED")) {
            message.setColor(colors[new Random().nextInt(colors.length)]);
            message.setMessage(message.getUsername() + " has been connected.");
        }
        this.chatService.save(message);
        System.out.println("handling send message: " + message + " to: " + to);
        simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);


        return message;
    }

    @MessageMapping("/chat/vedio/{of}")
    public VedioModel getVedioDetailOfUser(@DestinationVariable String of, String to) {
        VedioModel userToCall = this.videoUser.stream().filter(user -> user.getUsername().equals(of)).findFirst().get();
        System.out.println("user found is..........." + userToCall);
//		message.setDate(new Date().getTime());
//		if (message.getType().equals("CONNECTED")) {
//			message.setColor(colors[new Random().nextInt(colors.length)]);
//			message.setMessage(message.getUsername() + " has been connected.");
//		}
//		this.chatService.save(message);
//		System.out.println("handling send message: " + message + " to: " + to);
        simpMessagingTemplate.convertAndSend("/topic/patient/vedio/" + to, userToCall);

        VedioModel patientCalled = this.videoUser.stream().filter(user -> user.getUsername().equals(to)).findFirst().get();
        simpMessagingTemplate.convertAndSend("/topic/doctor/vedio/" + of, patientCalled);
        return userToCall;
    }

    @MessageMapping("/chat/vedio/adduser")
    public VedioModel saveVedioUser(VedioModel vedioModel) {
        Optional<VedioModel> userToCall = this.videoUser.stream().filter(user -> user.getUsername().equals(vedioModel.getUsername())).findFirst();
        if (userToCall.isEmpty()) {
            this.videoUser.add(vedioModel);
        } else {
            this.videoUser.remove(userToCall.get());
            this.videoUser.add(vedioModel);
        }

        System.out.println("saved user is" + vedioModel);
        System.out.println("id is" + this.videoUser.size());

//		message.setDate(new Date().getTime());
//		if (message.getType().equals("CONNECTED")) {
//			message.setColor(colors[new Random().nextInt(colors.length)]);
//			message.setMessage(message.getUsername() + " has been connected.");
//		}
//		this.chatService.save(message);
//		System.out.println("handling send message: " + message + " to: " + to);
//		simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);
//
//
        return vedioModel;
    }

    @MessageMapping("/history")
    public void history(String clientId) {

        this.simpMessagingTemplate.convertAndSend("/chat/history/" + clientId, this.chatService.getLastTenMessages());

    }
}