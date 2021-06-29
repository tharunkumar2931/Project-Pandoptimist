package com.stackroute.medicalrequestservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class MedicalRequestServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedicalRequestServiceApplication.class, args);
	}

}
