package com.ronge.voter;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class VoterHashTest {
  @Test
  void sameRowProducesTheSameCode() {
    String first = VoterHash.of("Bharati Manohar Babar", "Manohar Sampatrao Babar", "Yede", "M.G. VIDYA", 55, "F", "", "sangli", "220", 1);
    String second = VoterHash.of("Bharati Manohar Babar", "Manohar Sampatrao Babar", "Yede", "M.G. VIDYA", 55, "F", "", "sangli", "220", 1);
    assertEquals(first, second);
    assertEquals(64, first.length());
  }

  @Test
  void oneChangedColumnProducesAnotherCode() {
    String original = VoterHash.of("Bharati Manohar Babar", "Manohar", "Yede", "M.G. VIDYA", 55, "F", "", "sangli", "220", 1);
    String changedAge = VoterHash.of("Bharati Manohar Babar", "Manohar", "Yede", "M.G. VIDYA", 56, "F", "", "sangli", "220", 1);
    assertNotEquals(original, changedAge);
  }
}
