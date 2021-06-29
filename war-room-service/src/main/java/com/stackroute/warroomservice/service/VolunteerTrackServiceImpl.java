package com.stackroute.warroomservice.service;

import com.stackroute.warroomservice.model.TrackVolunteer;
import com.stackroute.warroomservice.model.VolunteerScore;
import com.stackroute.warroomservice.repository.VolunteerScoreRepository;
import com.stackroute.warroomservice.repository.VolunteerTrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VolunteerTrackServiceImpl implements VolunteerTrackService {

    @Autowired
    VolunteerTrackRepository volunteerTrackRepository;



    @Override
    public TrackVolunteer saveTrack(TrackVolunteer trackVolunteer) {
        return volunteerTrackRepository.save(trackVolunteer);
    }
}
