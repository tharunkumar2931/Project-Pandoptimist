package com.stackroute.warroomservice.repository;

import com.stackroute.warroomservice.model.TrackVolunteer;
import com.stackroute.warroomservice.model.VolunteerScore;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerTrackRepository extends MongoRepository<TrackVolunteer,Integer> {

}
