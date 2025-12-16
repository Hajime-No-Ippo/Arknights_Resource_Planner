package Server;

public final class Arknights {

    private Arknights() {
    }

    public static int calculate(int redStones, int yellowGem, int tenEmp, int singleEmp) {
        return (redStones + yellowGem * 160)/600 + tenEmp * 10 + singleEmp;
    }
}
