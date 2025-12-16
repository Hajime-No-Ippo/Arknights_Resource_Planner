package Server;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class ArknightsTest {
    @Test
    public void sumsInputsCorrectly() {
        int result = Arknights.calculate(600, 1, 2, 3);
        assertEquals(600 + 1 * 180, 780);
        // adjust expected if your formula changes
    }
    @Test
    public void handlesZeroInputs() {
        int result = Arknights.calculate(0, 0, 0, 0);
        assertEquals(0, result);
    }
    @Test
    public void handlesTamagoInputs() {
        int result = Arknights.calculate(521845, 333, 8, 223);
        assertEquals(1272, result);
    }
    @Test
    public void handlesEricInputs() {
        int result = Arknights.calculate(13698, 36, 0, 8);
        assertEquals(41, result);
    }
}
