package Week10;

public class Arknights {
    private int n = 521845;
    private int k = 333;
    private int tenEmployeement = 8;
    private int singleEmployment = 223;

    public Arknights(int n, int k, int tenEmployeement, int singleEmployment){
        this.n = n;
        this.k = k;
        this.tenEmployeement = tenEmployeement;
        this.singleEmployment = singleEmployment;
    }
    public int getN(){
        return n;
    }
    public int getK(){
        return k;
    }
    public int getTenEmployeement(){
        return tenEmployeement;
    }
    public int getSingleEmployment(){
        return singleEmployment;
    }

    public int countEmployees(){
        int sum = tenEmployeement * 10 + singleEmployment;
        return (n + (k * 180))/ 600 + sum;
    }

    public void printInfo(){

        System.out.println("\nRed Stones: " + n);
        System.out.println("Yellow Gems: " + k);
        System.out.println("Ten Employment: " + tenEmployeement);
        System.out.println("Single Employment: " + singleEmployment);    
    }
}
