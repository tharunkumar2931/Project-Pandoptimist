//package com.stackroute.usermanagementservice.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.gateway.route.RouteLocator;
//import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
//import org.springframework.cloud.netflix.hystrix.EnableHystrix;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.server.reactive.ServerHttpResponse;
//import org.springframework.http.server.reactive.ServerHttpRequest;
//import org.springframework.web.cors.reactive.CorsUtils;
//import org.springframework.web.server.ServerWebExchange;
//import org.springframework.web.server.WebFilter;
//import org.springframework.web.server.WebFilterChain;
//import reactor.core.publisher.Mono;
//
//@Configuration
//@EnableHystrix
//public class GatewayConfig {
//
//    @Autowired
//    AuthenticationFilter filter;
//
//    @Bean
//    public RouteLocator routes(RouteLocatorBuilder builder) {
//        return builder.routes()
//                .route("user-management-service", r -> r.path("/api/v2/**")
//                        .filters(f -> f.filter(filter))
//                        .uri("http://localhost:8089/"))
//                .route("user-management-service", r -> r.path("/api/v1/**")
//                        .filters(f -> f.filter(filter))
//                        .uri("http://localhost:8089/"))
//                .route("otp-service", r -> r.path("/api/v1/**")
//                        .filters(f -> f.filter(filter))
//                        .uri("http://localhost:8081/"))
////                .route(r->r.path("/api/v1/**").uri("http://localhost:8081/"))
//                .route("doctor-consultation-service", r -> r.path("/api/v1/**")
//                        .filters(f -> f.filter(filter))
//                        .uri("http://localhost:8082/"))
//                .route("donor-service", r -> r.path("/api/v1/**")
//                        .filters(f -> f.filter(filter))
//                        .uri("http://localhost:8083/"))
//                .route("volunteer-service", r -> r.path("/api/v1/**")
//                        .filters(f -> f.filter(filter))
//                        .uri("http://localhost:8084/"))
//                .route("patient-service", r -> r.path("/api/v1/**")
//                        .filters(f -> f.filter(filter))
//                        .uri("http://localhost:8085/"))
//                .route("graph-service", r -> r.path("/api/v1/**")
//                        .filters(f -> f.filter(filter))
//                        .uri("http://localhost:8086/"))
//                .route("medical-request-service", r -> r.path("/api/v1/**")
//                        .filters(f -> f.filter(filter))
//                        .uri("http://localhost:9091/"))
//                .route("chat-service", r -> r.path("/api/v1/**")
//                        .filters(f -> f.filter(filter))
//                        .uri("http://localhost:8095/"))
//                .build();
//    }
//
//    private static final String ALLOWED_HEADERS = "x-requested-with, authorization, Content-Type, Content-Length, Authorization, credential, X-XSRF-TOKEN";
//    private static final String ALLOWED_METHODS = "GET, PUT, POST, DELETE, OPTIONS, PATCH";
//    private static final String ALLOWED_ORIGIN = "*";
////    private static final String MAX_AGE = "7200"; //2 hours (2 * 60 * 60)
//    @Bean
//    public WebFilter corsFilter() {
//        return (ServerWebExchange ctx, WebFilterChain chain) -> {
//            ServerHttpRequest request = ctx.getRequest();
//            if (CorsUtils.isCorsRequest(request)) {
//                ServerHttpResponse response = ctx.getResponse();
//                HttpHeaders headers = response.getHeaders();
//                headers.add("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
//                headers.add("Access-Control-Allow-Methods", ALLOWED_METHODS);
////                headers.add("Access-Control-Max-Age", MAX_AGE); //OPTION how long the results of a preflight request (that is the information contained in the Access-Control-Allow-Methods and Access-Control-Allow-Headers headers) can be cached.
//                headers.add("Access-Control-Allow-Headers",ALLOWED_HEADERS);
//                if (request.getMethod() == HttpMethod.OPTIONS) {
//                    response.setStatusCode(HttpStatus.OK);
//                    return Mono.empty();
//                }
//            }
//            return chain.filter(ctx);
//        };
//    }
//
//
//}