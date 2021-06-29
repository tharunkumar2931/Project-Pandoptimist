//package com.stackroute.usermanagementservice.config;
//
//import com.netflix.client.config.IClientConfigKey;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import javax.annotation.PostConstruct;
//import java.security.Key;
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//
//    @Value("${jwt.secret}")
//    private String secret;
//
//    private Key key;
//
//    @PostConstruct
//    public void init(){
//        this.key = Keys.hmacShaKeyFor(secret.getBytes());
//
//    }
//
//    public Claims getAllClaimsFromToken(String token) {
//        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
//    }
//
//    private boolean isTokenExpired(String token) {
//        return this.getAllClaimsFromToken(token).getExpiration().before(new Date(System.currentTimeMillis()));
//    }
//
//    public boolean isInvalid(String token) {
//        return this.isTokenExpired(token);
//    }
//
//}