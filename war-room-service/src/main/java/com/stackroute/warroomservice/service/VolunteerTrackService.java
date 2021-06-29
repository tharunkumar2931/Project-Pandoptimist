package com.stackroute.warroomservice.service;

import com.stackroute.warroomservice.model.TrackVolunteer;
import com.stackroute.warroomservice.model.VolunteerScore;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VolunteerTrackService {
 TrackVolunteer saveTrack(TrackVolunteer trackVolunteer);
}
