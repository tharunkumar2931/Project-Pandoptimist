package com.stackroute.volunteer.controller;

import com.stackroute.volunteer.exceptions.VolunteerAlradyExistsException;
import com.stackroute.volunteer.model.Volunteer;
import com.stackroute.volunteer.rabbitmqConfig.MessageConfig;
import com.stackroute.volunteer.service.SequenceGeneratorService;
import com.stackroute.volunteer.service.VolunteerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
//@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
@RequestMapping("api/v1")
public class VolunteerController {
    private VolunteerService volunteerService;



    @Autowired
    SequenceGeneratorService sequenceGeneratorService;
    @Autowired
    private RabbitTemplate template;
    @Autowired
    public VolunteerController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    public final String UPLOAD_DIR="D:\\ProductDevelopment\\pandoptimist\\volunteer-service\\src\\main\\resources\\static\\images";


    @PostMapping("/volunteer")
    public ResponseEntity<Volunteer> saveVolunteer(@RequestBody Volunteer volunteer) throws VolunteerAlradyExistsException  {
        volunteer.setId(sequenceGeneratorService.getSequenceNumber(Volunteer.SEQUENCE_NAME));
        template.convertAndSend(MessageConfig.EXCHANGE,MessageConfig.ROUTING_KEY,volunteer);
        Volunteer savedVolunteer= volunteerService.saveVolunteer(volunteer);
        log.info("Volunteer details saved");
        log.info(String.valueOf(savedVolunteer));
        return new ResponseEntity<>(savedVolunteer, HttpStatus.CREATED);
    }
    @GetMapping("/volunteers")
    public ResponseEntity<List<Volunteer>> getAllVolunteer() throws Exception{
        return  new ResponseEntity<List<Volunteer>>((List<Volunteer>) volunteerService.getAllVolunteer(),HttpStatus.OK);
    }
}
