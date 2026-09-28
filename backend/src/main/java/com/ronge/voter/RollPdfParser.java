package com.ronge.voter;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Reads a Maharashtra teachers' constituency roll PDF in the PART220 layout:
 * a repeating header with district and part, nine columns, and one elector per serial number.
 */
public class RollPdfParser {
  private static final Pattern PART_HEADING = Pattern.compile("District:\\s*([A-Za-z]+).*?Part:\\s*(\\d+)", Pattern.CASE_INSENSITIVE);
  private static final List<String> COLUMN_INDEX = List.of("1", "2", "3", "4", "5", "6", "7", "8", "9");

  public List<ParsedVoter> parse(Path pdf) throws IOException {
    try (PDDocument document = Loader.loadPDF(pdf.toFile())) {
      return parse(document);
    }
  }

  public List<ParsedVoter> parse(InputStream pdf) throws IOException {
    try (PDDocument document = Loader.loadPDF(pdf.readAllBytes())) {
      return parse(document);
    }
  }

  private List<ParsedVoter> parse(PDDocument document) throws IOException {
    WordStripper stripper = new WordStripper();
    stripper.setSortByPosition(true);
    stripper.getText(document);
    List<Line> lines = lines(stripper.words);
    List<ParsedVoter> voters = new ArrayList<>();
    String district = "";
    String part = "";
    float[] columns = null;
    boolean inTable = false;
    Row current = null;

    for (Line line : lines) {
      String text = line.text();
      Matcher heading = PART_HEADING.matcher(text);
      if (heading.find()) {
        district = normalizeDistrict(heading.group(1));
        part = heading.group(2);
      }
      List<Word> indexWords = line.words.stream().filter(word -> word.text.matches("[1-9]")).toList();
      if (indexWords.size() == 9 && indexWords.stream().map(word -> word.text).toList().equals(COLUMN_INDEX)) {
        columns = new float[indexWords.size()];
        for (int index = 0; index < indexWords.size(); index++) {
          columns[index] = indexWords.get(index).x;
        }
        inTable = true;
        continue;
      }
      if (!inTable || columns == null) {
        continue;
      }
      if (text.startsWith("Part:")) {
        inTable = false;
        continue;
      }
      if (text.contains("Elector Name") || text.contains("Maharashtra") || text.contains("Qualify Date")) {
        continue;
      }
      if (current == null && !hasSerial(line, columns)) {
        continue;
      }
      for (Word word : line.words) {
        if (isSerial(word, columns)) {
          if (current != null) {
            add(voters, current, district, part);
          }
          current = new Row();
          current.add(0, word.text);
        } else if (current != null) {
          current.add(columnOf(word, columns), word.text);
        }
      }
    }
    if (current != null) {
      add(voters, current, district, part);
    }
    if (voters.isEmpty()) {
      throw new IllegalArgumentException("No voter rows were found. Upload a roll PDF in the same layout as PART220.");
    }
    return voters;
  }

  private void add(List<ParsedVoter> voters, Row row, String district, String part) {
    String serialText = clean(row.cols[0]);
    String name = clean(row.cols[1]);
    if (!serialText.matches("\\d+") || name.isBlank() || district.isBlank() || part.isBlank()) {
      return;
    }
    String epic = extractEpic(row);
    voters.add(new ParsedVoter(
        district,
        part,
        Integer.parseInt(serialText),
        name,
        clean(row.cols[2]),
        clean(row.cols[3]),
        clean(row.cols[4]),
        parseAge(clean(row.cols[5])),
        parseGender(clean(row.cols[6])),
        epic));
  }

  private boolean hasSerial(Line line, float[] columns) {
    for (Word word : line.words) {
      if (isSerial(word, columns)) {
        return true;
      }
    }
    return false;
  }

  private boolean isSerial(Word word, float[] columns) {
    return word.text.matches("\\d{1,4}") && Math.abs(word.x - columns[0]) < 36;
  }

  /** Header numbers sit toward the middle of each column, so data is matched to the nearest header except the serial. */
  private int columnOf(Word word, float[] columns) {
    int best = 1;
    float bestDistance = Math.abs(word.x - columns[1]);
    for (int index = 2; index < columns.length; index++) {
      float distance = Math.abs(word.x - columns[index]);
      if (distance < bestDistance) {
        best = index;
        bestDistance = distance;
      }
    }
    return best;
  }

  private String extractEpic(Row row) {
    Matcher matcher = Pattern.compile("\\b[A-Z]{3}\\d{7}\\b").matcher("");
    for (int index = 1; index < row.cols.length; index++) {
      String value = clean(row.cols[index]).toUpperCase(Locale.ROOT);
      matcher.reset(value);
      if (matcher.find()) {
        String epic = matcher.group();
        row.cols[index] = clean(row.cols[index]).replaceAll("(?i)" + Pattern.quote(epic), " ");
        return epic;
      }
    }
    return "";
  }

  private Integer parseAge(String value) {
    if (!value.matches("\\d+")) {
      return null;
    }
    return Integer.valueOf(value);
  }

  private String parseGender(String value) {
    if (value.equalsIgnoreCase("M") || value.equalsIgnoreCase("F")) {
      return value.toUpperCase(Locale.ROOT);
    }
    return "";
  }

  private String normalizeDistrict(String raw) {
    return switch (raw.toUpperCase(Locale.ROOT)) {
      case "PUNE" -> "pune";
      case "SATARA" -> "satara";
      case "SANGLI" -> "sangli";
      case "KOLHAPUR" -> "kolhapur";
      case "SOLAPUR" -> "solapur";
      default -> raw.toLowerCase(Locale.ROOT);
    };
  }

  private String clean(String value) {
    if (value == null) {
      return "";
    }
    return value.replaceAll("\\s+", " ").trim();
  }

  private List<Line> lines(List<Word> words) {
    List<Word> sorted = words.stream()
        .sorted(Comparator.comparingInt((Word word) -> word.page).thenComparingDouble(word -> word.y).thenComparingDouble(word -> word.x))
        .toList();
    List<Line> lines = new ArrayList<>();
    for (Word word : sorted) {
      Line line = lines.isEmpty() ? null : lines.get(lines.size() - 1);
      if (line == null || line.page != word.page || Math.abs(line.y - word.y) > 3.5f) {
        line = new Line(word.page, word.y);
        lines.add(line);
      }
      line.words.add(word);
    }
    return lines;
  }

  public record ParsedVoter(
      String district,
      String part,
      int serial,
      String name,
      String relativeName,
      String address,
      String institute,
      Integer age,
      String gender,
      String epicNo
  ) {}

  private static final class Word {
    final String text;
    final float x;
    final float y;
    final int page;

    Word(String text, float x, float y, int page) {
      this.text = text;
      this.x = x;
      this.y = y;
      this.page = page;
    }
  }

  private static final class Line {
    final int page;
    final float y;
    final List<Word> words = new ArrayList<>();

    Line(int page, float y) {
      this.page = page;
      this.y = y;
    }

    String text() {
      StringBuilder builder = new StringBuilder();
      for (Word word : words) {
        if (!builder.isEmpty()) {
          builder.append(' ');
        }
        builder.append(word.text);
      }
      return builder.toString();
    }
  }

  private static final class Row {
    final String[] cols = new String[9];

    void add(int column, String text) {
      if (column < 0 || column >= cols.length || text.isBlank()) {
        return;
      }
      cols[column] = cols[column] == null ? text : cols[column] + " " + text;
    }
  }

  private static final class WordStripper extends PDFTextStripper {
    final List<Word> words = new ArrayList<>();

    WordStripper() throws IOException {
      super();
    }

    @Override
    protected void writeString(String text, List<TextPosition> positions) {
      StringBuilder token = new StringBuilder();
      float startX = 0;
      float y = 0;
      TextPosition previous = null;
      for (TextPosition position : positions) {
        String character = position.getUnicode();
        if (character == null || character.isBlank()) {
          flush(token, startX, y);
          token.setLength(0);
          previous = position;
          continue;
        }
        float gap = previous == null ? 0 : position.getXDirAdj() - (previous.getXDirAdj() + previous.getWidthDirAdj());
        if (previous != null && gap > 1.8f) {
          flush(token, startX, y);
          token.setLength(0);
        }
        if (token.isEmpty()) {
          startX = position.getXDirAdj();
          y = position.getYDirAdj();
        }
        token.append(character);
        previous = position;
      }
      flush(token, startX, y);
    }

    private void flush(StringBuilder token, float x, float y) {
      String text = token.toString().trim();
      if (!text.isEmpty()) {
        words.add(new Word(text, x, y, getCurrentPageNo()));
      }
    }
  }
}
