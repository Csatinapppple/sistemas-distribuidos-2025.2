package calcRmi;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;



public class CalcImpl extends UnicastRemoteObject implements Calc {
    public CalcImpl() throws RemoteException {
        super();
    }

    public int add(int i, int j) {
        return i + j;
    }
}