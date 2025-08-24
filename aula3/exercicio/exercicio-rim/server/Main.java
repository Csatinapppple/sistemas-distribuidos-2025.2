package server;

import calcRmi.CalcImpl;
import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;

class Main {
	public static void main(String[] args){
		try {
		
			LocateRegistry.createRegistry(2004);

			CalcImpl objRMI = new CalcImpl();
			Naming.rebind("//127.0.0.1:2004/Calc", objRMI);
		}	catch(Exception e) {
			e.printStackTrace();
		}
	}
}
