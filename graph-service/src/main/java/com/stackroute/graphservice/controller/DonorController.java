package com.stackroute.graphservice.controller;


import com.stackroute.graphservice.model.Donor;
import com.stackroute.graphservice.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("api/v1")
//@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
public class DonorController {

    private DonorService donorService;

    @Autowired
    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }



    @GetMapping("/donors")
    public ResponseEntity<List<Donor>> getAllDonor() {

        return  new ResponseEntity<List<Donor>>((List<Donor>) donorService.getAllDonor(),HttpStatus.OK);

    }

    @GetMapping("/donors/{bloodGroup}/{myCity}")
    public ResponseEntity<List<Donor>> searchBymyCity(@PathVariable String bloodGroup,@PathVariable String myCity){

        List<Donor> result=donorService.searchBymyCity(bloodGroup,myCity);
        return new ResponseEntity<List<Donor>>( result,HttpStatus.OK);
    }

    @DeleteMapping("/donors/{id}")
    public HttpStatus deleteUser(@PathVariable int id)  {
        this.donorService.deleteUserById(id);
        return HttpStatus.OK;
    }

}
