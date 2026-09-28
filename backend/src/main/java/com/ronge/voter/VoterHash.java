package com.ronge.voter;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

/** Stable code for one complete voter row. The same columns always produce the same code. */
public final class VoterHash {
  private VoterHash() {}

  public static String of(
      String name,
      String relativeName,
      String address,
      String institute,
      Integer age,
      String gender,
      String epicNo,
      String district,
      String part,
      int serial
  ) {
    String line = String.join("\u001f",
        text(name),
        text(relativeName),
        text(address),
        text(institute),
        age == null ? "" : Integer.toString(age),
        text(gender),
        text(epicNo),
        text(district),
        text(part),
        Integer.toString(serial));
    try {
      byte[] digest = MessageDigest.getInstance("SHA-256").digest(line.getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(digest);
    } catch (NoSuchAlgorithmException ex) {
      throw new IllegalStateException("SHA-256 is not available", ex);
    }
  }

  private static String text(String value) {
    return value == null ? "" : value;
  }
}
