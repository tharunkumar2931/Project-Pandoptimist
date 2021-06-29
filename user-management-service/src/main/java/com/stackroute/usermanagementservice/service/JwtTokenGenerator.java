package com.stackroute.usermanagementservice.service;

import com.stackroute.usermanagementservice.model.User;

import java.util.Map;

public interface JwtTokenGenerator {
    Map<String, String> generateToken(User user, String type);

}
