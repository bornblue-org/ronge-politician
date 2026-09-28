package com.ronge.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "ronge")
public record RongeProperties(String adminUsername, String adminPassword, String jwtSecret, String uploadDir) {}
