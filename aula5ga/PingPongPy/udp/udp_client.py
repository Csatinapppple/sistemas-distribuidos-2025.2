import socket, sys, time

PACKET_MAX = 65507

def udp_client(ip_port, pkt_size):
    sock = socket.socket(
            socket.AF_INET,
            socket.SOCK_DGRAM)
 
    payload = bytes(pkt_size)
    
    after = None
    before = time.time()
    sock.sendto(payload, ip_port)

    try:
        data, server = sock.recvfrom(PACKET_MAX)
        
        after = time.time()

        #print(f"data received from {server} : {len(data.decode())}")
        
    except sock.timeout:
        print("socket reached timeout");
    
    delta_time = after - before
    
    print(f'{pkt_size}; {delta_time * 1000}; {len(packet)}; udp')

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
    udp_client(ip_port, pkt_size)




main()
