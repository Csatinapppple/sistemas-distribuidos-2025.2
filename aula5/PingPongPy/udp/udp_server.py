from socket import socket, AF_INET, SOCK_DGRAM
from sys import argv

UDP_PAYLOAD_MAX = 65507

def udp_server(host='localhost', port=8000):

    sock = socket(
            AF_INET,
            SOCK_DGRAM)
    
    server_address = (host, port)

    sock.bind(server_address)

    print(f'UDP Server listening on {host}:{port}')
    while True:
        try:
            data, client_addr = sock.recvfrom(UDP_PAYLOAD_MAX)

            print(f"Received from {client_addr}: {len(data.decode())}")

            response = data;

            sock.sendto(response, client_addr)
        
        except KeyboardInterrupt as ki:
            print(f"received keyboard interrupt{ki}")
            break;
        except Exception as e:
            print(f"server error: {e}")
    
    sock.close()

#use python3 udp_server.py $IP_ADDR $PORT

def main():
    
    if argv != 3:
        return
    udp_server(UDP_PAYLOAD_MAX, host=argv[2], port=int(argv[3]))

main()
