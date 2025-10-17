# test_udp.ps1
# Usage: .\test_udp.ps1 <IP_ADDRESS> <PORT>

param(
    [string]$IP_ADDRESS,
    [int]$PORT
)

python3 tcp_client.py $IP_ADDRESS $PORT 100 | Out-File -Append results.csv # 100 bytes
python3 tcp_client.py $IP_ADDRESS $PORT 500 | Out-File -Append results.csv # 500 bytes
python3 tcp_client.py $IP_ADDRESS $PORT 1024 | Out-File -Append results.csv # 1kb
python3 tcp_client.py $IP_ADDRESS $PORT 102400 | Out-File -Append results.csv # 100kb
python3 tcp_client.py $IP_ADDRESS $PORT 512000 | Out-File -Append results.csv # 500kb
python3 tcp_client.py $IP_ADDRESS $PORT 1048576 | Out-File -Append results.csv # 1mb
python3 tcp_client.py $IP_ADDRESS $PORT 10485760 | Out-File -Append results.csv # 10mb

Write-Host "Test completed! Results saved to results.csv" -ForegroundColor Green
