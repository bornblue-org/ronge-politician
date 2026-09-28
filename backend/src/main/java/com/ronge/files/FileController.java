package com.ronge.files;

import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Files;
import java.nio.file.Path;

@RestController
public class FileController {
  private final StoredFiles files;

  public FileController(StoredFiles files) {
    this.files = files;
  }

  @GetMapping("/api/files/{name}")
  ResponseEntity<Resource> read(@PathVariable String name) {
    Path path = files.resolvePublic("/api/files/" + name);
    if (!Files.exists(path)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
    }
    return ResponseEntity.ok().contentType(files.mediaType(path)).body(new PathResource(path));
  }
}
