import socket, sys, time

PACKET_MAX = 65507

def separate_in_chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

def udp_client(ip_port, pkt_size):
    sock = socket.socket(
            socket.AF_INET,
            socket.SOCK_DGRAM)
 
    payload = bytes(pkt_size)
    
    chunks = list(separate_in_chunks(payload, PACKET_MAX))

    after = None
    before = time.time()
    for packet in chunks:

        sock.sendto(packet, ip_port)
    
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
