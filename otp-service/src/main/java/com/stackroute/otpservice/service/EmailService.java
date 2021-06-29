package com.stackroute.otpservice.service;

//import com.stackroute.otpservice.model.User;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//@Slf4j
//@Service
//public class EmailService {
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void  sendEmail(String toEmail, String subject, int body){
//        SimpleMailMessage message=new SimpleMailMessage();
//        message.setFrom("pandoptimist@gmail.com");
//        message.setTo(toEmail);
//
//        message.setSubject(subject);
//        message.setText(String.valueOf(body));
//
//        mailSender.send(message);
//        log.info("Mail sent");
//
//    }
//
//    public void  sendEmailToPatient(String toEmail, String subject, String body){
//        SimpleMailMessage message=new SimpleMailMessage();
//        message.setFrom("pandoptimist@gmail.com");
//        message.setTo(String.valueOf(toEmail));
//
//        message.setSubject(subject);
////        message.setText(String.valueOf(body));
//        message.setText(body);
//        mailSender.send(message);
//        log.info("Mail sent");
//
//    }
//}

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;


import org.springframework.mail.javamail.MimeMessageHelper;

import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;


import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
@Slf4j
@Service
public class EmailService {

    @Autowired
    private JavaMailSender sender;

    @Autowired
    private Configuration config;

    public void sendEmail(String toEmail, Map<String, Object> model) throws MessagingException, TemplateException, IOException {

        MimeMessage message = sender.createMimeMessage();


        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());



        Template t = config.getTemplate("email-template.ftl");
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(t,model);

        helper.setTo(toEmail);
        helper.setText(html,true);
        helper.setSubject("OTP for login to Pandoptimist");
        helper.setFrom("pandoptimist@gmail.com");
        sender.send(message);
       log.info("otp");



    }

    public void  sendEmailToPatient(String toEmail, Map<String, Object> model) throws MessagingException, TemplateException, IOException {
//        SimpleMailMessage message=new SimpleMailMessage();
//        message.setFrom("pandoptimist@gmail.com");
//        message.setTo(String.valueOf(toEmail));
//
//        message.setSubject(subject);
//       message.setText(String.valueOf(body));
//        message.setText(body);
//       sender.send(message);
//        log.info("Mail sent");

        MimeMessage message = sender.createMimeMessage();


        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());



        Template t = config.getTemplate("email-templates.ftl");
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(t,model);

        helper.setTo(toEmail);
        helper.setText(html,true);
        helper.setSubject("Medical Request");
        helper.setFrom("pandoptimist@gmail.com");
        sender.send(message);
        log.info("message");
    }
}
