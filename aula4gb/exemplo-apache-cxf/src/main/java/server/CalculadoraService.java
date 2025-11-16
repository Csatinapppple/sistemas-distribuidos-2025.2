package server;

import jakarta.jws.WebService;
import jakarta.jws.WebMethod;

@WebService
public class CalculadoraService {
	
	@WebMethod
	public int somar(int a, int b){
		return a + b;
	}

}

