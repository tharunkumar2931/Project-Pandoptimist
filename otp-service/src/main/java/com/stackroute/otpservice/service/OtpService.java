package com.stackroute.otpservice.service;

import com.stackroute.otpservice.model.User;
import com.stackroute.otpservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Stream;
@Slf4j
@Service
public class OtpService {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
//    ArrayList<Integer> arraylist = new ArrayList<Integer>();
    ArrayList<User> otpUserList = new ArrayList<User>();
    private static final Integer EXPIRE_MINS = 4;

    public int generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
//        arraylist.add(otp);
        return otp;
    }

    public void clear(){
        otpUserList.clear();
    }


    public String message(String message){

        if(message.equalsIgnoreCase("OTP_VALID")) {
            return "OTP_VALID";
        }
            else{
            return "OTP_INVALID";
            }
        }

    public String validate(Integer otpnum,String mail) {

        final String fail= "OTP IS INVALID";
        final String success= "OTP IS VALID";

        log.info(String.valueOf(otpUserList));
        Stream<User> matchedUser= otpUserList.stream().filter(user -> user.getMail().equalsIgnoreCase(mail)&&user.getOtp()
                .equalsIgnoreCase(otpnum.toString()));

        log.info("After"+matchedUser);
         if(matchedUser.count()==1)
         {
             return success;
         }
         else {
             return fail;
         }

    }



    public  void add(User user){
        otpUserList.add(user);

        log.info("Initial"+otpUserList);
    }
//    public User get(){
//        return otpUserList.get(0);}

}
