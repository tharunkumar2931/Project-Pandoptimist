package com.stackroute.graphservice.repository;



import com.stackroute.graphservice.model.Donor;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonorRepository extends MongoRepository<Donor,Integer> {
}
