package com.stackroute.medicalrequestservice.rabbitmqConfig;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class MessageConfig {

    public static final String QUEUE = "medicalRequest_queue";
    public static final String EXCHANGE = "medicalRequest_exchange";
    public static final String ROUTING_KEY = "stackroute_key";

    public static final String QUEUE2 = "responseEmail_queue";
    public static final String EXCHANGE2 = "Email_exchange";
    public static final String ROUTING_KEY2 = "stackroute_response_key";

    public static final String QUEUE3 = "warroom_queue";
    public static final String EXCHANGE3 = "warroom_exchange";
    public static final String ROUTING_KEY3 = "stackroute_response_key";

    public static final String QUEUE4 = "warroom_resource_queue";
    public static final String EXCHANGE4 = "warroom_resource_exchange";
    public static final String ROUTING_KEY4 = "stackroute_response_key";

    @Bean
    public Queue queue() {
        return new Queue(QUEUE);
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY);
    }



    @Bean
    public Queue queue2() {
        return new Queue(QUEUE2);
    }

    @Bean
    public TopicExchange exchange2() {
        return new TopicExchange(EXCHANGE2);
    }

    @Bean
    public Binding binding2(Queue queue2, TopicExchange exchange2) {
        return BindingBuilder.bind(queue2).to(exchange2).with(ROUTING_KEY2);
    }

    @Bean
    public MessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate template(ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(converter());
        return rabbitTemplate;
    }



    @Bean
    public Queue queue3() {
        return new Queue(QUEUE3);
    }

    @Bean
    public TopicExchange exchange3() {
        return new TopicExchange(EXCHANGE3);
    }

    @Bean
    public Binding binding3(Queue queue3, TopicExchange exchange3) {
        return BindingBuilder.bind(queue3).to(exchange3).with(ROUTING_KEY3);
    }

    @Bean
    public Queue queue4() {
        return new Queue(QUEUE4);
    }

    @Bean
    public TopicExchange exchange4() {
        return new TopicExchange(EXCHANGE4);
    }

    @Bean
    public Binding binding4(Queue queue4, TopicExchange exchange4) {
        return BindingBuilder.bind(queue4).to(exchange4).with(ROUTING_KEY4);
    }

}
