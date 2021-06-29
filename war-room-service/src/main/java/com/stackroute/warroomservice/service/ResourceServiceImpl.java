package com.stackroute.warroomservice.service;

import com.stackroute.warroomservice.model.Resources;
import com.stackroute.warroomservice.model.VolunteerScore;
import com.stackroute.warroomservice.repository.ResourceDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceServiceImpl implements ResourceService{

    @Autowired
    ResourceDataRepository resourceDataRepository;


    @Override
    public Resources save(Resources resources) {
        return resourceDataRepository.save(resources);
    }

    @Override
    public List<Resources> getAllResources() {
        return (List<Resources>)resourceDataRepository.findAll();
    }
}
