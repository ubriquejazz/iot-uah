#!/bin/bash
TOPIC=$1
FILE=$2
IP="192.168.1.104" # Cambia esto por la IP real 

# Comprobamos que se pase al menos el tópico
if [ $# -ne 2 ]; then
    echo "Uso: $0 <topic> <certificate>"
    exit 1
fi

echo "Escuchando en el tópico: $TOPIC..."
mosquitto_sub -h "$IP" -p 8883 -t "$TOPIC" --cafile "$FILE" --insecure