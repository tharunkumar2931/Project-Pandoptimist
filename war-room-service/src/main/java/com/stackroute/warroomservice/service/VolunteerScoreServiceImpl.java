package com.stackroute.warroomservice.service;

import com.stackroute.warroomservice.model.TrackVolunteer;
import com.stackroute.warroomservice.model.VolunteerScore;
import com.stackroute.warroomservice.repository.VolunteerScoreRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@Slf4j
@Service
public class VolunteerScoreServiceImpl implements VolunteerScoreService {

    @Autowired
    VolunteerScoreRepository volunteerScoreRepository;
    @Autowired
    SequenceGeneratorService sequenceGeneratorService;
    List<VolunteerScore> allresourse=new ArrayList<>();
    List<VolunteerScore> selectedVolunteer=new ArrayList<>();

    @Override
    public VolunteerScore saveScore(VolunteerScore volunteerScore) {
        volunteerScore.setId(sequenceGeneratorService.getSequenceNumber(volunteerScore.SEQUENCE_NAME));
        return volunteerScoreRepository.save(volunteerScore);
    }
    @Override
    public List<VolunteerScore> getAllVolunteerScore() {
        return (List<VolunteerScore>)volunteerScoreRepository.findAll();
    }

    @Override
    public VolunteerScore getByEmail(String email) {
        List<VolunteerScore> specificVolunteer=new ArrayList<>();
        allresourse=volunteerScoreRepository.findAll();

        log.info("............"+allresourse);
        specificVolunteer =  allresourse.stream()
                .filter(res->(res.getVolunteerEmailId().equalsIgnoreCase(email))).collect(Collectors.toList());
        if(specificVolunteer.size()==0){
            VolunteerScore vscore = null;
            return vscore;
        }else {
            VolunteerScore vscore= specificVolunteer.get(0);

            log.info("%%%%%%%%%%%"+ vscore);
            return vscore;
        }
    }



//    public ArrayList<VolunteerScoreCard> getVol(String email){
//        List<VolunteerScore> getAllVol= new ArrayList<>();
//        selectedVolunteer = volunteerScoreRepository.findAll();
//        getAllVol =  selectedVolunteer.stream()
//                .filter(res->(res.getVolunteerEmailId().equalsIgnoreCase(email))).collect(Collectors.toList());
//        for(int i=0;i<getAllVol.size();i++){
//            getAllVol.get(i).getVolunteerInteractions().get(i).getRequestScore()
//        }
//    }
}
