package com.stackroute.usermanagementservice.service;

import com.stackroute.usermanagementservice.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtTokenGeneratorImpl implements JwtTokenGenerator{


    @Value("${jwt.secret}")
    private String secret;

    @Value("${app.jwttoken.message}")
    private String message;

    private String expirationTime = "86400";

    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    @Override
    public Map<String, String> generateToken(User user, String type) {
        String jwtToken = "";
//        jwtToken = Jwts.builder().setSubject(user.getEmail())
//                .setClaims()
//                .setIssuedAt(new Date(System.currentTimeMillis()
//                + JWT_TOKEN_VALIDITY *1000))
//                .signWith(SignatureAlgorithm.HS256,secret).compact();

        long expirationTimeLong;
        if ("ACCESS".equals(type)) {
            expirationTimeLong = Long.parseLong(expirationTime) * 1000;
        } else {
            expirationTimeLong = Long.parseLong(expirationTime) * 1000 * 5;
        }
        final Date createdDate = new Date();
        final Date expirationDate = new Date(createdDate.getTime() + expirationTimeLong);

        Map<String, Object> claims = new HashMap<>();

        jwtToken= Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(createdDate)
                .setExpiration(expirationDate)
                .signWith(key)
                .compact();


        Map<String, String> jwtTokenMap= new HashMap<>();
        jwtTokenMap.put("token", jwtToken);
        return jwtTokenMap;
    }
}

