package com.stackroute.patientservice.model;

import lombok.*;

@ToString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Donor {
    private int id;
    private String name;
    private String age;
    private String phoneNumber;
    private String emailId;
    private String myCity;
    private String bloodGroup;
}
