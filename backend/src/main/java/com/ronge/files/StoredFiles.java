package com.ronge.files;

import com.ronge.config.RongeProperties;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

@Service
public class StoredFiles {
  private static final Set<String> IMAGES = Set.of("jpg", "jpeg", "png", "webp");
  private final Path root;

  public StoredFiles(RongeProperties properties) throws IOException {
    this.root = Path.of(properties.uploadDir()).toAbsolutePath().normalize();
    Files.createDirectories(root);
  }

  public String saveImage(MultipartFile file) throws IOException {
    if (file == null || file.isEmpty()) {
      throw new IllegalArgumentException("Choose an image");
    }
    String extension = extension(file.getOriginalFilename());
    if (!IMAGES.contains(extension)) {
      throw new IllegalArgumentException("Use a jpg, png, or webp image");
    }
    String name = UUID.randomUUID() + "." + extension;
    try (InputStream input = file.getInputStream()) {
      Files.copy(input, root.resolve(name));
    }
    return "/api/files/" + name;
  }

  public Path resolvePublic(String publicPath) {
    if (publicPath == null || !publicPath.startsWith("/api/files/")) {
      throw new IllegalArgumentException("Unknown file");
    }
    String name = publicPath.substring("/api/files/".length());
    if (name.isBlank() || name.contains("..") || name.contains("/") || name.contains("\\")) {
      throw new IllegalArgumentException("Unknown file");
    }
    Path path = root.resolve(name).normalize();
    if (!path.startsWith(root)) {
      throw new IllegalArgumentException("Unknown file");
    }
    return path;
  }

  public void deletePublic(String publicPath) {
    if (publicPath == null || publicPath.isBlank()) {
      return;
    }
    try {
      Files.deleteIfExists(resolvePublic(publicPath));
    } catch (IOException | IllegalArgumentException ignored) {
      // A missing upload should not block deleting the record.
    }
  }

  public MediaType mediaType(Path path) {
    String name = path.getFileName().toString().toLowerCase(Locale.ROOT);
    if (name.endsWith(".png")) return MediaType.IMAGE_PNG;
    if (name.endsWith(".webp")) return MediaType.parseMediaType("image/webp");
    return MediaType.IMAGE_JPEG;
  }

  private String extension(String filename) {
    if (filename == null || !filename.contains(".")) {
      return "";
    }
    return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase(Locale.ROOT);
  }
}
