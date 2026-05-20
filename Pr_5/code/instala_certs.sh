#!/bin/bash

RUTA_CA_KEY="ca.key"
RUTA_CA_CRT="ca.crt"
IP="192.168.1.104" # Cambia esto por la IP real 

echo "=== 1. Generando clave privada del servidor (server.key) ==="
openssl genrsa -out server.key 2048

echo "=== 2. Creando solicitud de firma (server.csr) ==="
# Se automatizan los campos para que no te pregunte uno por uno, aplicando tu IP en el CN
openssl req -new -out server.csr -key server.key \
    -subj "/C=ES/ST=Madrid/L=Alcala/O=MiCasa/CN=$IP"

echo "=== 3. Firmando el certificado del servidor con tu CA (server.crt) ==="
echo "Te va a pedir la contraseña de tu ca.key ahora:"
openssl x509 -req -in server.csr -CA "$RUTA_CA_CRT" -CAkey "$RUTA_CA_KEY" \
    -CAcreateserial -out server.crt -days 365 -sha256

echo "=== 4. Creando directorios y moviendo archivos ==="
sudo mkdir -p /etc/mosquitto/ca_certificates
sudo mkdir -p /etc/mosquitto/certs

# Copia la CA si está en la carpeta actual
if [ -f "$RUTA_CA_CRT" ]; then
    sudo cp "$RUTA_CA_CRT" /etc/mosquitto/ca_certificates/
fi

sudo mv server.crt server.key /etc/mosquitto/certs/

echo "=== 5. Aplicando permisos para el usuario mosquitto ==="
sudo chown -R mosquitto:mosquitto /etc/mosquitto/ca_certificates/
sudo chown -R mosquitto:mosquitto /etc/mosquitto/certs/
sudo chmod 600 /etc/mosquitto/certs/server.key

echo "=== 6. Limpiando archivos temporales ==="
rm -f server.csr ca.srl

echo "=== 7. Reiniciando Mosquitto ==="
sudo systemctl restart mosquitto.service

echo "=== ¡Proceso completado! Verificando estado... ==="
sleep 1
sudo systemctl status mosquitto.service --no-pager