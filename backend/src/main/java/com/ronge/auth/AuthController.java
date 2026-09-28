package com.ronge.auth;

import com.ronge.config.RongeProperties;
import com.ronge.security.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AuthController {
  private final RongeProperties properties;
  private final JwtService jwtService;

  public AuthController(RongeProperties properties, JwtService jwtService) {
    this.properties = properties;
    this.jwtService = jwtService;
  }

  @PostMapping("/login")
  Map<String, String> login(@Valid @RequestBody LoginRequest request) {
    if (!properties.adminUsername().equals(request.username()) || !properties.adminPassword().equals(request.password())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong username or password");
    }
    return Map.of("token", jwtService.issue(request.username()));
  }

  public record LoginRequest(@NotBlank String username, @NotBlank String password) {}
}
