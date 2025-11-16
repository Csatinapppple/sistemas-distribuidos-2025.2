package client;

import client.wsdl.CalculadoraServiceService;
import client.wsdl.CalculadoraService;

public class Client {
	public static void main(String[] args) {

		try {
		var service = new CalculadoraServiceService();
		var port = service.getCalculadoraServicePort();

		int resultado = port.somar(15, 20);

		System.out.printf("resultado da chamada de somar(15, 20) no Servidor %d", resultado);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
