package com.ronge.voter;

import org.junit.jupiter.api.Test;

import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
}
