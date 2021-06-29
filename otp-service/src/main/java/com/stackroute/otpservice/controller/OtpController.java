package com.stackroute.otpservice.controller;

import com.stackroute.otpservice.model.User;
import com.stackroute.otpservice.service.EmailService;
import com.stackroute.otpservice.service.OtpService;
import com.stackroute.otpservice.service.UserService;
import freemarker.template.TemplateException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Slf4j
//@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
@RestController
@RequestMapping("/api/v1")
public class OtpController {
    @Autowired
    private EmailService service;
    @Autowired
    public OtpService otp;
    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public void saveUser(@RequestBody User user) throws MessagingException, TemplateException, IOException {
        Map<String, Object> model = new HashMap<>();
        Integer ss=otp.generateOTP();
        user.setOtp(ss.toString());
        otp.add(user);
      model.put("otp",ss.toString());

        service.sendEmail(user.getMail(),model);
        userService.saveUser(user);
    }


    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>((List<User>) userService.getAllUser(), HttpStatus.OK);

    }


    @RequestMapping(value ="/validate/otp/{otpnum}/mail/{mail}", method = RequestMethod.GET)
    public  String validateOtp(@PathVariable("otpnum") Integer otpnum, @PathVariable("mail") String mail){
        log.info(otpnum+mail);

        String os=otp.validate(otpnum,mail);
        log.info(os);
        return os;
    }

}
