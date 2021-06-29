package com.stackroute.chatservice.model;

import org.springframework.data.annotation.Id;

public class VedioModel {
    private String id;
    //    private String message;
//    private Long date;
    private String username;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
