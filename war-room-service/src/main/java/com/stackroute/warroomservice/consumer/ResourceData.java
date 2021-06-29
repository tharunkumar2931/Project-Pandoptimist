package com.stackroute.warroomservice.consumer;

import com.stackroute.warroomservice.model.Resources;
import com.stackroute.warroomservice.model.Volunteer;
import com.stackroute.warroomservice.rabbitmqConfig.MessageConfig;
import com.stackroute.warroomservice.repository.ResourceDataRepository;
import com.stackroute.warroomservice.service.ResourceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ResourceData {

    ResourceService resourceService;

    @Autowired
    public ResourceData(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @RabbitListener(queues = MessageConfig.QUEUE4)
    public void consumeMessageFromQueue(Resources resources) {
        resourceService.save(resources);
        log.info("Message recieved from queue : "+ resources);

    }
}
