package com.stackroute.warroomservice.repository;

import com.stackroute.warroomservice.model.Resources;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceDataRepository extends MongoRepository<Resources,Integer> {
}
