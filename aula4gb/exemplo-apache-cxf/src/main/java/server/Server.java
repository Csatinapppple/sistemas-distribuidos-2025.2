package server;

import jakarta.xml.ws.Endpoint;

import server.CalculadoraService;

public class Server {
    public static void main(String[] args){
        Endpoint.publish("http://localhost:8080/calculadora", new CalculadoraService());
        System.out.println("Servidor hosteando em localhost:8080");
        System.out.println("nova linha para finalizar");
        try {
            System.in.read();
        } catch(Exception e){
            e.printStackTrace();
        }

    }
}
