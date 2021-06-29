package com.stackroute.usermanagementservice.jwtfilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;

//        final String authHeader = request.getHeader("Authorization");
//
//        if ("OPTIONS".equals(request.getMethod())) {
//            response.setStatus(HttpServletResponse.SC_OK);
//            filterChain.doFilter(request, response);
//        } else {
//            /*
//             * Check if authHeader is null or does not start with "Bearer " then throw Exception
//             */
//            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                throw new ServletException("Authentication failed");
//            }
//        }
//        final String token = authHeader.substring(7);
//        Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody();
//        request.setAttribute("claims", claims);
//        request.setAttribute("service app", servletRequest.getParameter("id"));
//
//        /*
//         * Extract token from authHeader
//         */
//
//        /*
//         * Obtain Claims by parsing the token with the signing key value "secret"
//         */
//
//        /*
//         * Set Claims object obtained in previous step with key "claims" as request attribute
//         */
//
//        /*
//         * Set user id passed as request parameter with key "user" as request attribute
//         */
//

        filterChain.doFilter(request, response);
    }

}