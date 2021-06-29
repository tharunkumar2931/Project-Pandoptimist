package com.stackroute.warroomservice.controller;


import com.stackroute.warroomservice.model.Resources;
import com.stackroute.warroomservice.model.VolunteerScore;
import com.stackroute.warroomservice.service.ResourceService;
import com.stackroute.warroomservice.service.VolunteerScoreService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@RestController
@RequestMapping("api/v1/volunteer")
//@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
public class WarRoomController {

    VolunteerScoreService volunteerScoreService;
    ResourceService resourceService;


    @Autowired
    public WarRoomController(VolunteerScoreService volunteerScoreService, ResourceService resourceService) {
        this.volunteerScoreService = volunteerScoreService;
        this.resourceService = resourceService;
    }


    @GetMapping("/leader-board")
    public ResponseEntity<List<VolunteerScore>> getScoreCard(){
        List<VolunteerScore> allScore= volunteerScoreService.getAllVolunteerScore();

    allScore.sort(Comparator.comparing(VolunteerScore::getTotalScore).reversed());
        List<VolunteerScore> sortedScore=   allScore.stream().limit(3).collect(Collectors.toList());


//        allScore.sort((VolunteerScore s1, VolunteerScore s2)->(int)s1.getTotalScore()-(int)s2.getTotalScore());
//        allScore.sort(Comparator.comparing(VolunteerScore::getTotalScore).thenComparing(VolunteerScore::getName));
//        allScore.stream().limit(3).collect(Collectors.toList());
        return new ResponseEntity<List<VolunteerScore>>(sortedScore, HttpStatus.OK);
    }

    @GetMapping("/allResources")
    public ResponseEntity<List<Resources>> getResources(){
        return new ResponseEntity<List<Resources>>((List<Resources>) resourceService.getAllResources(), HttpStatus.OK);
    }
}
