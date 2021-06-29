package com.stackroute.warroomservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection="volunteer_interarction")
public class TrackVolunteer {
   @Id
   int patientId;
   String volunteerEmailId;
   String type;

}
