package com.stackroute.warroomservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@ToString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="volunteer_score")
@Component
public class VolunteerScore {

    @Transient
    @Id
    public static final String SEQUENCE_NAME="db_sequence";
    private int id;
    String volunteerEmailId;
    String name;
    long totalScore;
    String volunteerLevel;
    int rewardPerTenScore;
    long monitoryValue;
    public ArrayList<VolunteerInteraction> volunteerInteractions;

}
