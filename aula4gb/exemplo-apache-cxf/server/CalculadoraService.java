package server;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface CalculadoraService{
	@WebMethod 
	int somar(int a, int b);
}

@WebService(endpointInterface = "server.CalculadoraServiceImpl")
public class CalculadoraServiceImpl implements CalculadoraService {
	
	public int somar(int a, int b){
		return a + b;
	}

}
