package com.stackroute.graphservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.neo4j.ogm.annotation.NodeEntity;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import org.springframework.stereotype.Component;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection="donorDetails")
@Component
public class Donor {

    @Id
    @Transient
    public static final String SEQUENCE_NAME="user_sequence";
    private int id;
    private String name;
    private String age;
    private String phoneNumber;
    private String emailId;
    private String myCity;
    private String bloodGroup;



}