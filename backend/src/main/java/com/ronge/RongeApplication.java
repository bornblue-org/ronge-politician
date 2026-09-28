package com.ronge;

import com.ronge.config.RongeProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(RongeProperties.class)
public class RongeApplication {
  public static void main(String[] args) {
    SpringApplication.run(RongeApplication.class, args);
  }
}
