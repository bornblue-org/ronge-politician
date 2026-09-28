package com.ronge.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(ResponseStatusException.class)
  ResponseEntity<Map<String, String>> status(ResponseStatusException ex) {
    String message = ex.getReason() == null ? "Request failed" : ex.getReason();
    return ResponseEntity.status(ex.getStatusCode()).body(Map.of("message", message));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<Map<String, String>> invalid(MethodArgumentNotValidException ex) {
    String message = ex.getBindingResult().getFieldErrors().stream()
        .findFirst()
        .map(error -> error.getField() + " " + error.getDefaultMessage())
        .orElse("Check the form");
    return ResponseEntity.badRequest().body(Map.of("message", message));
  }

  @ExceptionHandler(MaxUploadSizeExceededException.class)
  ResponseEntity<Map<String, String>> tooLarge(MaxUploadSizeExceededException ex) {
    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(Map.of("message", "File is too large"));
  }

  @ExceptionHandler(IllegalArgumentException.class)
  ResponseEntity<Map<String, String>> badRequest(IllegalArgumentException ex) {
    return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
  }
}
