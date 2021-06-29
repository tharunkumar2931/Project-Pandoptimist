package com.stackroute.patientservice.client;

import com.stackroute.patientservice.model.Donor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name="graph-service",url="localhost:8086")
public interface GraphServiceClient {


    @GetMapping("api/v1/donors")
    public List<Donor> getAllDonor();

    @GetMapping("api/v1/donors/{bloodGroup}/{myCity}/")
    public List<Donor> searchBymyCity(@PathVariable String bloodGroup,@PathVariable String myCity);
    

    @DeleteMapping("api/v1/donors/{id}")
    public HttpStatus deleteUser(@PathVariable int id);

}
