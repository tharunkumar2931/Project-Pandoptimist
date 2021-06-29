package com.stackroute.usermanagementservice.service;

import com.stackroute.usermanagementservice.exceptions.UserNotFoundException;
import com.stackroute.usermanagementservice.model.User;

public interface RegistrationAndLoginService {
    User saveRegisteredUser(User user);
    User findByEmail(String email) throws UserNotFoundException;
    void updateRoleByEmail(User userWithRole);

}
