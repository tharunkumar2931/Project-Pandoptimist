package com.stackroute.medicalrequestservice.service;

import com.stackroute.medicalrequestservice.model.MedicalRequest;
import com.stackroute.medicalrequestservice.model.Resources;
import com.stackroute.medicalrequestservice.repository.ResourceRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ResourceServiceImpl implements ResourceService{
    @Autowired
    SequenceGeneratorService sequenceGeneratorService;
    private ResourceRepository resourceRepository;
    List<Resources> allresourse=new ArrayList<>();

    @Autowired
    public ResourceServiceImpl(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    Timestamp timestamp = new Timestamp(System.currentTimeMillis());
     Date createdDate= new Date();

    @Override
    public Resources saveResource(Resources resources) {
        resources.setId(sequenceGeneratorService.getSequenceNumber(resources.SEQUENCE_NAME));
        resources.setAddedTime(new Timestamp(createdDate.getTime()));
        return resourceRepository.save(resources);
    }

    @Override
    public List<Resources> getAllResource() {
        return (List<Resources>)resourceRepository.findAll();
    }

    @Override
    public List<Resources> findAllResource() {
        allresourse=(ArrayList<Resources>) resourceRepository.findAll();

        log.info(String.valueOf(allresourse));
        return allresourse;
    }

    @Override
    public List<Resources> getSpecificResource(String requirment,String myCity) {
        List<Resources> specificResource=new ArrayList<>();
        allresourse=(ArrayList<Resources>) resourceRepository.findAll();
        System.out.println(requirment+"-----"+myCity);
        System.out.println("............"+allresourse);
        specificResource=  allresourse.stream()

                .filter(res->((res.getMedicineName().equalsIgnoreCase(requirment) || res.getBedType().equalsIgnoreCase(requirment) || res.getMedicalEquipmentName().equalsIgnoreCase(requirment))) && (res.getAvalabilityPlace().equalsIgnoreCase(myCity) && res.getIsVerified().equals(true)) ).collect(Collectors.toList());
        System.out.println(specificResource);

        return specificResource;
    }

    @Override
    public Resources resourcesNotVerified() {
        List<Resources> listOfResources= new ArrayList<Resources>();
        List<Resources> unverifiedResource=new ArrayList<Resources>();
        listOfResources=resourceRepository.findAll();
        System.out.println(listOfResources.toString());
        unverifiedResource=listOfResources.stream().filter(unverified->unverified.getIsVerified().equals(false)).collect(Collectors.toList());
        Random rand = new Random();
        log.info("Filter single obj "+unverifiedResource.get(rand.nextInt(unverifiedResource.size())));
        Resources unverified= unverifiedResource.get(rand.nextInt(unverifiedResource.size()));
        return unverified;
    }

    @Override
    public Resources verifyResource(int id, Resources resources) {
        Resources resources1 = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource Request not found for this id :: " + id));

        resources1.setIsVerified(true);

        final Resources updatedResource = resourceRepository.save(resources1);
        return updatedResource;
    }

    @Override
    public Resources updataStatus(int id, Resources resources) {
        Resources resources1 = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource Request not found for this id :: " + id));

        resources1.setIsVerified(false);

        final Resources updatedResource = resourceRepository.save(resources1);
        return updatedResource;
    }
}
// || res.getBedType().equals(requirment) || res.getMedicalEquipmentName().equals(requirment)

//&& res.getIsVerified().equals(true)
// && res.getAvalabilityPlace().equalsIgnoreCase(myCity)