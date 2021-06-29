package com.stackroute.warroomservice.service;


import com.stackroute.warroomservice.model.Resources;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface ResourceService {
    Resources save(Resources resources);
    List<Resources> getAllResources();
}
