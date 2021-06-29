package com.stackroute.warroomservice.consumer;

import com.stackroute.warroomservice.model.Volunteer;
import com.stackroute.warroomservice.rabbitmqConfig.MessageConfig;
import com.stackroute.warroomservice.repository.VolunteerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@Slf4j
public class VolunteerData {


    VolunteerRepository volunteerRepository;
    @Autowired
    public VolunteerData(VolunteerRepository volunteerRepository) {
        this.volunteerRepository = volunteerRepository;
    }

    @RabbitListener(queues = MessageConfig.QUEUE)
    public void consumeMessageFromQueue(Volunteer volunteer) {
        volunteerRepository.save(volunteer);
        log.info("Message recieved from queue : "+ volunteer);

    }
}
