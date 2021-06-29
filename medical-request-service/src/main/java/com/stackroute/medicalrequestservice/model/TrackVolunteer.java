package com.stackroute.medicalrequestservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TrackVolunteer {
   String volunteerEmailId;
   String type;
   @Id
   int patientId;
}
