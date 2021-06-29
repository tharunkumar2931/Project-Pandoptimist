package com.stackroute.usermanagementservice.controller;

import com.stackroute.usermanagementservice.exceptions.UserNotFoundException;
import com.stackroute.usermanagementservice.model.User;
import com.stackroute.usermanagementservice.service.JwtTokenGenerator;
import com.stackroute.usermanagementservice.service.RegistrationAndLoginService;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@Slf4j
@RestController
//@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "*")
@RequestMapping("api")
public class RegistrationAndLoginController {

    private RegistrationAndLoginService registrationService;
    private JwtTokenGenerator jwtTokenGenerator;
    ResponseEntity<?> responseEntity;

    @Value("${app.controller.exception.message1}")
    private String message1;

    @Value("${app.controller.exception.message2}")
    private String message2;

    @Value("${app.controller.exception.message3}")
    private String message3;


    @Autowired
    public RegistrationAndLoginController(RegistrationAndLoginService registrationService, JwtTokenGenerator jwtTokenGenerator) {
        this.registrationService = registrationService;
        this.jwtTokenGenerator = jwtTokenGenerator;
    }


    @PostMapping(value = "/v1/updaterole")
    public String roleUpdate(@RequestBody User userWithRole) {

        registrationService.updateRoleByEmail(userWithRole);
        return "role Successfully updated";
    }


    @PostMapping(value = "/v2/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) throws UserNotFoundException {
        Map<String, String> jwtToken11 = null;
        try {
            if (user.getEmail() == null || user.getPassword() == null) {
//                throw new UserNotFoundException(message1);
               return responseEntity = new ResponseEntity<>(message1, HttpStatus.FORBIDDEN);
            }
            User userDetails = registrationService.findByEmail(user.getEmail());
            if (userDetails == null) {
//                throw new UserNotFoundException(message2);
                return responseEntity = new ResponseEntity<>(message2, HttpStatus.FORBIDDEN);
            }
            if (!BCrypt.checkpw(user.getPassword(), userDetails.getPassword())) {
//                throw new UserNotFoundException(message3);
                return responseEntity = new ResponseEntity<>(message3, HttpStatus.UNAUTHORIZED);
            }
            jwtToken11 = jwtTokenGenerator.generateToken(userDetails, "ACCESS");
            responseEntity = new ResponseEntity<>(jwtTokenGenerator.generateToken(userDetails, "ACCESS"),HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }

        User rolefromdb = this.registrationService.findByEmail(user.getEmail());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("token", jwtToken11.get("token"));
        httpHeaders.set("role", rolefromdb.getRole()); //keep role as empty string instead of null
        httpHeaders.set("email", user.getEmail());
        return new ResponseEntity<>(responseEntity, httpHeaders, HttpStatus.OK);
//        return responseEntity;
    }



    @PostMapping("/v2/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        User regUser = registrationService.saveRegisteredUser(user);
        log.info(String.valueOf(regUser));
        return new ResponseEntity<User>(regUser, HttpStatus.CREATED);
    }


}
