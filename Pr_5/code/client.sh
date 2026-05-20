#!/bin/bash
TOPIC=$1
MESSAGE=$2
FILE=$3
IP="192.168.1.104" # Cambia esto por la IP real 

# Verificar que haya exactamente 3 argumentos
if [ $# -ne 3 ]; then
    echo "Uso: $0 <topic> <mensaje> <certificate>"
    exit 1
fi

mosquitto_pub -h "$IP" -p 8883 -t "$TOPIC" -m "$MESSAGE" --cafile "$FILE" --insecure