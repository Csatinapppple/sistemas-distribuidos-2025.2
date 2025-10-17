package calcRmi;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Calc extends Remote {
    int add(int i, int j) throws RemoteException;
}
