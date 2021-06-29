package com.stackroute.otpservice.Consumer;


import com.stackroute.otpservice.model.EmailQueue;
import com.stackroute.otpservice.rabbitmqConfig.MessageConfig;
import com.stackroute.otpservice.service.EmailService;
import freemarker.template.TemplateException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
@Slf4j
@Component
public class EmailQueueConsumer {

    @Autowired
    private EmailService service;

   @RabbitListener(queues = MessageConfig.QUEUE2)
    public void consumeMessageFromQueue(EmailQueue emailQueue) throws MessagingException, TemplateException, IOException {
       Map<String, Object> model = new HashMap<>();
       model.put("message",emailQueue.getBody());
       service.sendEmailToPatient(emailQueue.getMailId(), model);

                log.info("Message recieved from queue : "+ emailQueue);
    }
}
