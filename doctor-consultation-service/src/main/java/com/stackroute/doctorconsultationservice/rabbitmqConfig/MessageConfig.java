//package com.stackroute.doctorconsultationservice.rabbitmqConfig;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//
//import org.springframework.amqp.core.*;
//import org.springframework.amqp.rabbit.connection.ConnectionFactory;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
//import org.springframework.amqp.support.converter.MessageConverter;
//
//
//@Configuration
//public class MessageConfig {
//
//    public static final String QUEUE = "doctorDetails_queue";
//    public static final String EXCHANGE = "doctor_exchange";
//    public static final String ROUTING_KEY = "stackroute_key";
//
//    @Bean
//    public Queue queue() {
//        return new Queue(QUEUE);
//    }
//
//    @Bean
//    public TopicExchange exchange() {
//        return new TopicExchange(EXCHANGE);
//    }
//
//    @Bean
//    public Binding binding(Queue queue, TopicExchange exchange) {
//        return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY);
//    }
//
//    @Bean
//    public MessageConverter converter() {
//        return new Jackson2JsonMessageConverter();
//    }
//
//    @Bean
//    public AmqpTemplate template(ConnectionFactory connectionFactory) {
//        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
//        rabbitTemplate.setMessageConverter(converter());
//        return rabbitTemplate;
//    }
//}
