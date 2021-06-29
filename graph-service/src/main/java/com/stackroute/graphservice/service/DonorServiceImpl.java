package com.stackroute.graphservice.service;

import com.stackroute.graphservice.model.Donor;
import com.stackroute.graphservice.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DonorServiceImpl implements  DonorService {

    private DonorRepository donorRepository ;
    @Autowired
    public DonorServiceImpl(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }



    @Override
    public List<Donor> getAllDonor() {
        return (List<Donor>) donorRepository.findAll();
    }
    @Override
    public List<Donor> searchBymyCity(String bloodGroup,String myCity) {
       List<Donor> donor1=donorRepository.findAll();
        List<Donor> donorlist=new ArrayList<Donor>();
        for(Donor usr:donor1){
            if( usr.getBloodGroup().equalsIgnoreCase(bloodGroup) && usr.getMyCity().equalsIgnoreCase(myCity) ) {

                donorlist.add(usr);
                break;
            }
        }
        return donorlist;
    }

    @Override
    public void deleteUserById(int id) {
        Optional<Donor> userDB=this.donorRepository.findById(id);
        this.donorRepository.delete(userDB.get());
    }




}
