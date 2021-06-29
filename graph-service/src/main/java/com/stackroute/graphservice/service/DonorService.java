package com.stackroute.graphservice.service;




import com.stackroute.graphservice.model.Donor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DonorService {

    List<Donor> getAllDonor();
    List<Donor> searchBymyCity(String bloodGroup,String myCity);
    public void deleteUserById(int id);


}