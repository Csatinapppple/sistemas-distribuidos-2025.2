from socket import socket, AF_INET, SOCK_STREAM, SOL_SOCKET, SO_SNDBUF, SO_RCVBUF
from sys import argv

DATA_MAX = 10485760

def tcp_server(host='localhost', port=8000):


    try:

        sock = socket(
                AF_INET,
                SOCK_STREAM)
        
        sock.setsockopt(SOL_SOCKET, SO_SNDBUF, 1048576)  # 1MB send buffer
        sock.setsockopt(SOL_SOCKET, SO_RCVBUF, 1048576)  # 1MB receive buffer
        server_address = (host, port)

        sock.bind(server_address)
        
        sock.listen(1)
        print(f'TCP Server listening on {host}:{port}')
        
        while True:
            client_sock, client_addr = sock.accept()
            print(f'connection from {client_addr}')

            data = client_sock.recv(DATA_MAX)
            print(f'received {len(data)}')

            client_sock.sendall(data)



    except Exception as e:
        print(f'exception happened {e}')

    sock.close()

#use python3 udp_server.py $IP_ADDR $PORT

def main():

    if len(argv) != 3:
        tcp_server()
    else:
        tcp_server(argv[1], int(argv[2]))

main()
