package com.stackroute.warroomservice.repository;

import com.stackroute.warroomservice.model.VolunteerScore;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerScoreRepository extends MongoRepository<VolunteerScore,Integer> {
    VolunteerScore findByVolunteerEmailId(String email);
}
