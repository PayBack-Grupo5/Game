package com.payback.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@Configuration
@EnableWebSocket
public class PayBackApplication4 implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(@NonNull WebSocketHandlerRegistry registry) {
        registry.addHandler(lobbyHandler(), "/payback/lobby").setAllowedOrigins("*");
        registry.addHandler(posHandler(), "/payback/position").setAllowedOrigins("*");
        registry.addHandler(shootHandler(), "/payback/shoot").setAllowedOrigins("*");
    }

    @Bean
    public WS_Position posHandler() {
        return new WS_Position();
    }

    @Bean
    public WS_Lobby lobbyHandler() {
        return new WS_Lobby();
    }

    @Bean
    public WS_Shoot shootHandler() {
        return new WS_Shoot();
    }

    public static void main(String[] args) {
        SpringApplication.run(PayBackApplication4.class, args);
    }
}
