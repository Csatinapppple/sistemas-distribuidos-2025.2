#!/bin/sh

# use test_tcp.sh $IP_ADDRESS $PORT
python3 tcp_client.py $1 $2 100 >> results.csv # 100 bytes
python3 tcp_client.py $1 $2 500 >> results.csv # 500 bytes
python3 tcp_client.py $1 $2 1024 >> results.csv # 1kb
python3 tcp_client.py $1 $2 102400 >> results.csv # 100kb
python3 tcp_client.py $1 $2 512000 >> results.csv # 500kb
python3 tcp_client.py $1 $2 1048576 >> results.csv # 1mb
python3 tcp_client.py $1 $2 10485760 >> results.csv # 10mb
