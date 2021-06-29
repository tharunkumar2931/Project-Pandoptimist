package com.stackroute.warroomservice.service;

import com.stackroute.warroomservice.model.Volunteer;
import com.stackroute.warroomservice.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class VolunteerServiceImpl implements VolunteerService{
    @Autowired
    VolunteerRepository volunteerRepository;
//    @Override
//    public Volunteer saveVolunteer(Volunteer volunteer) {
//        return null;
//    }
//
//    @Override
//    public ArrayList<Volunteer> getRegisteredVolunteer() {
//        return null;
//    }

    @Override
    public Volunteer findByEmailId(String email) {
        return volunteerRepository.findByEmailId(email);
    }
}
