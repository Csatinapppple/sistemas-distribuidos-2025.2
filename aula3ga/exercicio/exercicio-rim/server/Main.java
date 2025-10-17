package server;

import calcRmi.CalcImpl;
import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;

class Main {
	public static void main(String[] args){
		try {
			//Usa a porta 2004 para receber chamadas
			LocateRegistry.createRegistry(2004); 

			CalcImpl objRMI = new CalcImpl();

			//Ouve o IP localhost porta 2004 com a classe Calc
			Naming.rebind("//127.0.0.1:2004/Calc", objRMI);

		}	catch(Exception e) {
			e.printStackTrace();
		}
	}
}
