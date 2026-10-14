package com.ronge.voter;

import org.junit.jupiter.api.Test;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

class RollPdfParserTest {
  @Test
  void readsSangliPart220() throws Exception {
    List<RollPdfParser.ParsedVoter> rows = new RollPdfParser().parse(Path.of("..", "PART220_EN_0505.pdf"));
    assertEquals(43, rows.size(), rows.stream().map(row -> row.serial() + " " + row.name()).toList().toString());
    RollPdfParser.ParsedVoter first = rows.get(0);
    assertEquals("sangli", first.district());
    assertEquals("220", first.part());
    assertEquals(1, first.serial());
    assertTrue(first.name().contains("Bharati"));
    assertEquals("F", first.gender());
    RollPdfParser.ParsedVoter withEpic = rows.stream().filter(row -> row.serial() == 16).findFirst().orElseThrow();
    assertEquals("UCZ5501291", withEpic.epicNo());
    assertEquals(43, rows.get(rows.size() - 1).serial());
  }

  @Test
  void rejectsGraduatesRollWithAClearMessage() {
    Path pdf = Path.of("..", "PART100_EN_6366.pdf");
    assumeTrue(Files.exists(pdf), "sample PDF not present");
    IllegalArgumentException error = assertThrows(IllegalArgumentException.class, () -> new RollPdfParser().parse(pdf));
    assertTrue(error.getMessage().contains("graduates' roll"), error.getMessage());
  }

  /** The consolidated roll prints "Part No. 194" in the header and ends with a "Shifted to" footnote. */
  @Test
  void readsSangliPart194ConsolidatedRoll() throws Exception {
    Path pdf = Path.of("..", "TAC3_DIST493_PART194_EN_2582.pdf");
    assumeTrue(Files.exists(pdf), "sample PDF not present");
    List<RollPdfParser.ParsedVoter> rows = new RollPdfParser().parse(pdf);
    assertEquals(80, rows.size());
    for (int index = 0; index < rows.size(); index++) {
      RollPdfParser.ParsedVoter row = rows.get(index);
      assertEquals(index + 1, row.serial(), "serial order at row " + index);
      assertEquals("sangli", row.district());
      assertEquals("194", row.part());
      assertTrue(row.address().matches(".*\\d{6}$"), "address of " + row.name());
      assertTrue(row.age() != null && row.age() > 17, "age of " + row.name());
      assertTrue(row.gender().equals("M") || row.gender().equals("F"), "gender of " + row.name());
    }
    assertEquals("Dipali Rajesh Aathavle", rows.get(0).name());
    assertEquals("MATOSHRI BAYABAI KADAM KANYA MAHAVIDYALA KADEAGON", rows.get(0).institute());
    assertEquals("UCZ5858980", rows.get(6).epicNo());
    // Row 8's institute overflows into row 9; neither may swallow or garble the other's text.
    assertEquals("Bharati vidyapith Matoshri Bayabai Shripati Kadam Mahadidyalay, Kadegaon", rows.get(7).institute());
    assertEquals("MATOSHRI BAYABAI KADAM KANYA MAHAVIDYALA KADEAGON", rows.get(8).institute());
    RollPdfParser.ParsedVoter last = rows.get(79);
    assertEquals("Urmila Santosh Yadav", last.name());
    assertEquals("SARASWATI GLOBAL SCHOOL KADEPUR", last.institute());
    assertEquals("XEP6932487", rows.get(78).epicNo());
  }
}
