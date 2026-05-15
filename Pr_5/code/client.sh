#!/bin/bash
TOPIC=$1
MESSAGE=$2
FILE=$3

# Verificar que haya exactamente 3 argumentos
if [ $# -ne 3 ]; then
    echo "Uso: $0 <topic> <mensaje> <certificate>"
    exit 1
fi

mosquitto_pub -h localhost -p 8883 -t "$TOPIC" -m "$MESSAGE" --cafile "$FILE" --insecure