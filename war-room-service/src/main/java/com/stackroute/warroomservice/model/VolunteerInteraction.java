package com.stackroute.warroomservice.model;

import lombok.*;
import org.springframework.stereotype.Component;

@ToString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Component
public class VolunteerInteraction {
    int requestId;
    String typeOfRequest;
    int requestScore;
}
