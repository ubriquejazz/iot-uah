# Stmas e ifaces web en IoT (labs)

## Practicas guiadas 20%

- Práctica de Linux y Javascript (Pr_3)
- Protocolos utilizados en IoT (MQTT, NodeRED)
- NRF52840 y/o Micro:Bit para BLE (Pr_4)
- Remotly measuring temperatures using [Ciseco](https://draptik.github.io/posts/2015/07/10/remotly-measuring-temperatures-with-a-raspberry-pi-using-radio-frequency-modules-from-ciseco-part-1-hardware/) 
- Práctica comunicaciones MQTT seguras (Pr_5)
- Javascript avanzado (Pr_6)
- Programación con micropython (Pr_7)

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

### Web server

Para la visualización de los datos de los dos nodos hardware descritos se desarrollará un servidor Web en la RPi4 con **Node-RED**. El servidor debe ser capaz  de:

- Publicación y admisión de suscripción a datos de los nodos MQTT. El formato de mensajes será JSON.
- Gestión de los cuatro GPIOs de salida y visualización del estado de los ocho GPIOs utilizados.
