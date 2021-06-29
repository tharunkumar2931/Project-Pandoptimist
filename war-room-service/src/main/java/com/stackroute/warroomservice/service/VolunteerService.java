package com.stackroute.warroomservice.service;

import com.stackroute.warroomservice.model.Volunteer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface VolunteerService {
//    Volunteer saveVolunteer(Volunteer volunteer);
//    ArrayList<Volunteer> getRegisteredVolunteer();
    public Volunteer findByEmailId(String email);
}
