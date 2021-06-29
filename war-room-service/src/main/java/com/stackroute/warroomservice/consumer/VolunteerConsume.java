package com.stackroute.warroomservice.consumer;

import com.stackroute.warroomservice.model.TrackVolunteer;
import com.stackroute.warroomservice.model.VolunteerInteraction;
import com.stackroute.warroomservice.model.VolunteerScore;
import com.stackroute.warroomservice.rabbitmqConfig.MessageConfig;
import com.stackroute.warroomservice.repository.VolunteerScoreRepository;
import com.stackroute.warroomservice.service.VolunteerScoreService;
import com.stackroute.warroomservice.service.VolunteerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@Slf4j
public class VolunteerConsume {

    @Autowired
    VolunteerService volunteerService;
    VolunteerScoreService volunteerScoreService;
    @Autowired
    VolunteerScoreRepository volunteerScoreRepository;
    @Autowired
    public VolunteerConsume(VolunteerScoreService volunteerScoreService) {
        this.volunteerScoreService = volunteerScoreService;
    }

    @RabbitListener(queues = MessageConfig.QUEUE3)
    public void consumeMessageFromQueue(TrackVolunteer trackVolunteer) {
        VolunteerScore volunteerScore=new VolunteerScore();
        VolunteerInteraction volunteerInteraction=new VolunteerInteraction();
        ArrayList<VolunteerInteraction> volRecord = new ArrayList<>();
//        long totScore=0

        volunteerInteraction.setRequestId(trackVolunteer.getPatientId());
        volunteerInteraction.setTypeOfRequest(trackVolunteer.getType());
        if (trackVolunteer.getType().equalsIgnoreCase("Request_Closure_Medicine")) {
            volunteerInteraction.setRequestScore(100);
        } else if (trackVolunteer.getType().equalsIgnoreCase("Request_Closure_Bed")) {
            volunteerInteraction.setRequestScore(600);
        } else if (trackVolunteer.getType().equalsIgnoreCase("Request_Closure_Equipment")) {
            volunteerInteraction.setRequestScore(800);
        } else if (trackVolunteer.getType().equalsIgnoreCase("Request_Pass_Medicine")) {
            volunteerInteraction.setRequestScore(-3);
        } else if (trackVolunteer.getType().equalsIgnoreCase("Request_Pass_Bed")) {
            volunteerInteraction.setRequestScore(-5);
        } else if (trackVolunteer.getType().equalsIgnoreCase("Request_Pass_Equipment")) {
            volunteerInteraction.setRequestScore(-4);
        }

        volunteerScore.setVolunteerEmailId(trackVolunteer.getVolunteerEmailId());



//        volunteerScore.setName(volunteerService.findByEmailId(trackVolunteer.getVolunteerEmailId()).getName());

        volunteerScore.setVolunteerInteractions(volRecord);


        log.info(volunteerScore.toString());


        VolunteerScore vscore= volunteerScoreService.getByEmail(trackVolunteer.getVolunteerEmailId());


        log.info("My Email "+ vscore);
        if(vscore!=null){
            vscore.getVolunteerInteractions().add(volunteerInteraction);

            ArrayList<VolunteerInteraction> allScore= new ArrayList<>();
            long totScore=0;
            allScore=vscore.getVolunteerInteractions();
            for(int i=0;i<allScore.size();i++)
            {
                totScore=totScore+allScore.get(i).getRequestScore();
                vscore.setTotalScore(totScore);

            }
            System.out.println("========"+totScore);

            vscore.setTotalScore(totScore);
            if(vscore.getTotalScore()<=499){
                vscore.setVolunteerLevel("Level 1");
                vscore.setRewardPerTenScore(0);
                vscore.setMonitoryValue((10*vscore.getRewardPerTenScore())+vscore.getTotalScore());
            }else if(vscore.getTotalScore()>499 && vscore.getTotalScore()<=999){
                vscore.setVolunteerLevel("Level 2");
                vscore.setRewardPerTenScore(10);
                vscore.setMonitoryValue((10*vscore.getRewardPerTenScore())+vscore.getTotalScore());
            }else if(vscore.getTotalScore()>999 && vscore.getTotalScore()<=1999){
                vscore.setVolunteerLevel("Level 3");
                vscore.setRewardPerTenScore(50);
                vscore.setMonitoryValue((10*vscore.getRewardPerTenScore())+vscore.getTotalScore());
            }else if(vscore.getTotalScore()>1999 && vscore.getTotalScore()<=4999){
                vscore.setVolunteerLevel("Gold_Volunteer");
                vscore.setRewardPerTenScore(700);
                vscore.setMonitoryValue((10*vscore.getRewardPerTenScore())+vscore.getTotalScore());
            }else if(vscore.getTotalScore()>4999){
                vscore.setVolunteerLevel("Angel_Volunteer");
                vscore.setRewardPerTenScore(1000);
                vscore.setMonitoryValue((10*vscore.getRewardPerTenScore())+vscore.getTotalScore());
            }

            volunteerScoreRepository.delete(vscore);
            volunteerScoreService.saveScore(vscore);
        }else if(vscore==null){
            volRecord.add(volunteerInteraction);
            volunteerScoreService.saveScore(volunteerScore);
        }




        log.info(String.valueOf(trackVolunteer));
        log.info("Volunterr Interatction");
        log.info(volRecord.toString());
        log.info("Track Record");
        log.info(volunteerScore.toString());

    }
}
