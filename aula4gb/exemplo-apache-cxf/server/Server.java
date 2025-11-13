package server;

import javax.xml.ws.Endpoint;

import server.CalculadoraServiceImpl;

public class Server {
    public static void main(String[] args){
        Endpoint.publish("http://localhost:8080/calculadora", new CalculadoraServiceImpl());
        
        try {
            System.in.read();
        } catch(Exception e){
            e.printStackTrace();
        }

    }
}
