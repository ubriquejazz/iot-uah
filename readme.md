# Stmas e ifaces web en IoT (labs)

## Practicas guiadas 20%

### uC para IoT
Características de los microcontroladores ESP32
- Programación con micropython
- Programación a bajo nivel (ESP-IDF)

### Protocolos de comunicaciones utilizados en IoT
- Práctica de protocolos utilizados en IoT (MQTT, NodeRED)
- Práctica comunicaciones MQTT seguras

### Comunicaciones inalámbricas
- NRF52840-DONGLE para ZigBee, BLE
- [Ciseco Transceiver](https://draptik.github.io/posts/2015/07/10/remotly-measuring-temperatures-with-a-raspberry-pi-using-radio-frequency-modules-from-ciseco-part-1-hardware/) Remotly measuring temperatures 

- 

## Practica final 30%

Se propone el desarrollo de una aplicación para el control de varias salidas digitales y la monitorización de entradas digitales y varios sensores. La aplicación utilizará el siguiente hardware:

- Raspberry Pi4, ESP32
- B-L475E-IOT01A Discovery kit.
  

### Raspberry Pi4

La Raspberry ofrecerá 4 señales digitales (GPIO) de salida y  otras 4 de entrada. Tanto la lectura de GPIOs de entrada como la  activación (High/Low) de los GPIOs de salida se controlarán con mensajes MQTT.

### Nodo 1

El ESP32 se conectará a una WiFi (TBC). Cada 4 s enviará el valor de **dos sensores** simulados usando protocolo MQTT.

### Nodo 2
El B-L475E-IOT01A Discovery kit se conectará a una WiFi (TBC). Cada vez que se pulse el botón de usuario (azul) se enviarán los datos de humedad, temperatura usando protocolo MQTT.

### Broker MQTT
Se utilizará un broker local en la RPi4 para publicar y suscribir mensajes MQTT. Opcionalmente se puede usar seguridad SSL.

## Web server
Para la visualización de los datos de los dos nodos hardware descritos se desarrollará un servidor Web en la RPi4 con **Node-RED**. El servidor debe ser capaz  de:

- Publicación y admisión de suscripción a datos de los nodos MQTT. El formato de mensajes será JSON.
  
- Publicación de la información de las sensores y estados de las entradas y salidas digitales. Los datos se representarán de forma gráfica,  usando...
  -  ‘gauges’ para la visualización de los valores actuales de cada  sensor 
  
  -  ‘charts’ para la visualización histórica de  los sensores de temperatura y humedad proporcionados por el nodo 2 (últimas 24 horas) 
  
- Gestión de los cuatro GPIOs de salida y visualización del estado de los ocho GPIOs utilizados.
