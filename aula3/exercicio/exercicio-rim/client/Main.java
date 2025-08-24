package client;

import java.rmi.Naming;
import calcRmi.Calc;

public class Main {
	public static void main(String[] args) {
		try {
			Calc objCalc = (Calc)Naming.lookup("//localhost:2004/Calc");
			System.out.println("O resultado da soma é : " + objCalc.add(3, 7));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
