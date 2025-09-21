import socket, sys, time

PACKET_MAX = 10485760

def tcp_client(ip_port, pkt_size):
    sock = socket.socket(
            socket.AF_INET,
            socket.SOCK_STREAM)
 
    payload = bytes(pkt_size)
    
    after = None
    before = time.time()

    try:
        
        sock.connect(ip_port)
        
        sock.sendall(payload)

        response = sock.recv(PACKET_MAX)
        
        after = time.time()

        #print(f"data received from {server} : {len(data.decode())}")
        
    except Exception as e:
        print("exception: {e}")
    finally:
        sock.close()

    delta_time = after - before
    
    print(f'{pkt_size}; {delta_time * 1000}; tcp')

"""
    command line arguments
    ip type
    example:
    $ python3 udp_client.py $IP_ADDRESS $PORT $PKT_SIZE
"""
def main():

    if (len(sys.argv) != 4):
        return
    
    ip_port = (sys.argv[1], int(sys.argv[2]))
    pkt_size = int(sys.argv[3])
    #print(ip_port)
    tcp_client(ip_port, pkt_size)




main()
