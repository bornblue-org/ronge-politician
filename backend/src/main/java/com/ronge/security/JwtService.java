package com.ronge.security;

import com.ronge.config.RongeProperties;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {
  private static final long TWELVE_HOURS = 12 * 60 * 60L;
  private final SecretKey key;

  public JwtService(RongeProperties properties) {
    this.key = Keys.hmacShaKeyFor(properties.jwtSecret().getBytes(StandardCharsets.UTF_8));
  }

  public String issue(String username) {
    Instant now = Instant.now();
    return Jwts.builder()
        .subject(username)
        .issuedAt(Date.from(now))
        .expiration(Date.from(now.plusSeconds(TWELVE_HOURS)))
        .signWith(key)
        .compact();
  }

  public String subject(String token) {
    try {
      return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject();
    } catch (JwtException | IllegalArgumentException ex) {
      return null;
    }
  }
}
