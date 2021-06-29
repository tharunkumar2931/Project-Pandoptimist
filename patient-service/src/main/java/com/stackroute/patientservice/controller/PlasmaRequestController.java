package com.stackroute.patientservice.controller;

import com.stackroute.patientservice.client.GraphServiceClient;
import com.stackroute.patientservice.exception.RequestAlreadyExistsException;


import com.stackroute.patientservice.model.Donor;
import com.stackroute.patientservice.model.PlasmaRequest;
import com.stackroute.patientservice.service.PlasmaRequestService;

import com.stackroute.patientservice.service.SequenceGeneratorService1;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
//@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
@RestController
@RequestMapping("api/v1")
public class PlasmaRequestController {

    private PlasmaRequestService plasmaRequestService;
    @Autowired
    public PlasmaRequestController(PlasmaRequestService plasmaRequestService) {
        this.plasmaRequestService = plasmaRequestService;
    }
    @Autowired
    private SequenceGeneratorService1 services;


    @Autowired
    private GraphServiceClient graphServiceClient;


    @PostMapping("/plasmaRequest")
    public ResponseEntity<PlasmaRequest> savePlasmaRequest(@RequestBody PlasmaRequest plasmaRequest) throws RequestAlreadyExistsException {
        plasmaRequest.setId(services.getSequenceNumbers(PlasmaRequest.SEQUENCE_NAME));
        PlasmaRequest savedPatient = plasmaRequestService.savePlasmaRequest(plasmaRequest);
        log.info(" Plasma Request Saved");
        log.info(String.valueOf(savedPatient));
        return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
    }

    @GetMapping("/plasmaRequests")
    public ResponseEntity<List<PlasmaRequest>> getAllPatient() {
        return new ResponseEntity<List<PlasmaRequest>>(plasmaRequestService.getAllPlasmaRequest(), HttpStatus.OK);

    }




    @GetMapping("/donors")
    public ResponseEntity<List<Donor>> getAllDonor(){
        List<Donor> donorList= graphServiceClient.getAllDonor();
        return new ResponseEntity<List<Donor>>(donorList,HttpStatus.OK);
    }

    @GetMapping("/donors/{bloodGroup}/{myCity}")
    public ResponseEntity<List<Donor>> searchBymyCity(@PathVariable String bloodGroup,@PathVariable String myCity) {

        List<Donor> result=  graphServiceClient.searchBymyCity(bloodGroup,myCity);
        return new ResponseEntity<List<Donor>>(result, HttpStatus.CREATED);
    }

    @DeleteMapping("/donors/{id}")
    public HttpStatus deleteUser(@PathVariable int id)  {
        this.graphServiceClient.deleteUser(id);
        return HttpStatus.OK;
    }

}
