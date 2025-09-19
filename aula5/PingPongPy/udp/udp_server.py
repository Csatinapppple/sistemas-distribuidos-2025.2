from socket import socket, AF_INET, SOCK_DGRAM

UDP_PAYLOAD_MAX = 65507

def udp_server(pkt_siz, host='localhost', port=8000):

    sock = socket(
            AF_INET,
            SOCK_DGRAM)
    
    server_address = (host, port)

    sock.bind(server_address)

    print(f'UDP Server listening on {host}:{port}')
    while True:
        try:
            data, client_addr = sock.recvfrom(pkt_siz)

            print(f"Received from {client_addr}: {len(data.decode())}")

            response = data;

            sock.sendto(response, client_addr)
        
        except KeyboardInterrupt as ki:
            print(f"received keyboard interrupt{ki}")
            break;
        except Exception as e:
            print(f"server error: {e}")
    
    sock.close()


def main():
    udp_server(UDP_PAYLOAD_MAX)

main()
