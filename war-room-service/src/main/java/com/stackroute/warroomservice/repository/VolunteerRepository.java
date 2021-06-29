package com.stackroute.warroomservice.repository;

import com.stackroute.warroomservice.model.Volunteer;
import com.stackroute.warroomservice.model.VolunteerScore;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerRepository extends MongoRepository<Volunteer,Integer> {
    public Volunteer findByEmailId(String email);
}
