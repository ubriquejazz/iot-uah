# Practica Libre

Juan M. Gago (03/06)

Jose Miguel Gimeno

Se propone el desarrollo de una aplicación para la monitorización de la carga de una bateria. La aplicación utilizará el siguiente hardware:

![](fig/esquema.png)

- Raspberry Pi4 (RPi4) donde corre los servidores de la aplicación
- Raspberry Zero (pizero) con un rele y cuatro pulsadores
- ESP32 WROOM con un sensor INA (simula el SoC de una bateria)
- B-L475E-IOT01A Discovery kit.
- [Pulsador](https://www.amazon.es/interruptor-Akozon-Interruptor-pulsador-universal/dp/B08N44GQ5Q/ref=sr_1_7?) de 4 botones y relay 5VDC (JQC-3FF-S-Z)

### Servidor (RPi4)

**Broker MQTT**

- Se utilizará un broker local para publicar y suscribir mensajes MQTT.
- Ver configuracion en este fichero de la [Pr5](../Pr_5/code/mosquitto.conf) (seguridad con user + pwd. )

Para la visualización de los datos de los dos nodos hardware descritos se despliega un servidor Web con **Node-RED**

- Publicación y admisión de suscripción a datos de los nodos MQTT. El formato de mensajes será JSON.
  - **Nodo 0**: topic_relay, topic_threshold
  - **Nodos 1 y 2**: topic_esp, topic_disco
- Información de los sensores y estados de las entradas y salidas digitales. Los datos se representarán de forma gráfica,  usando...
  -  ‘gauges’ para la visualización de los valores actuales de cada sensor 
  -  ‘charts’ para la visualización histórica de  los sensores de temperatura y humedad proporcionados por el nodo 2 (últimas 24 horas) 
  - 'led' virtual para visualizar el estado del rele.
- Mas informacion en este ejercicio de la [Pr3](../Pr_3/code/ex05.md)

**Lighttp**

A parte de Node-Red, la RPi4 tendra otro servidor web local con el valor de voltage medido. 

- Si esta por debajo del **threshold** se muestra de color rojo (negro de otro modo). 
- Internamente, un cliente se subscribe a los topics: topic_esp y topic_threshold (pizero).
- Habria que copiar [Pr6](../Pr_6/code/) a la carpeta /var/www/html y reiniciar el servidor

`sudo service lighttpd force-reload`

### Nodo 0 (pizero)

La pizero ofrecerá 2 señales digitales (GPIO) de entrada y otra de salida. Tanto la lectura de GPIOs de entrada como la activación del GPIO de salida se controlarán con mensajes MQTT.

- topic_relay, topic_threshold (controlado por los cuatro switches)

### Nodo 1 (esp)

El ESP32 se conectará a una WiFi (TBC). Cada 4 s enviará el valor de **dos sensores**  usando protocolo MQTT (**topic_esp**)

- Sensor I2C **INA3321** (modo voltage)
- Sensor de temperatura con ADC

### Nodo 2 (disco)

El B-L475E-IOT01A Discovery kit se conectará a una WiFi (TBC). Cada vez que se pulse el botón de usuario (azul) se enviarán los datos de humedad, temperatura usando el protocolo MQTT (**topic_disco**).

## Funcionamiento

Suponemos que el ESP32 esta justo al lado de una bateria la cual se quiere monitorizar.

El rele de la pizero simula una alarma. Se activa cuando el valor de voltage medido por el INA3321 es menor que un threshold. Asi mismo el valor del threshold viene determinado por la pulsacion de los dos switches segun la tabla:

La pizero publica este valor en el topic_threshold. Suponemos que la pizero es el interfaz HMI del sistema, con lo que no tiene capacidad de decision sobre el rele (no esta subscrita al topic_esp).

En node-red se muestra en un gauge el valor de voltage / temperatura de la bateria y valor del threshold. La funcion **safety** es la que actua sobre el rele en el caso de que el voltage sea menor que el threshold o cualquiera de las temperaturas es critica.

## Resumen del codigo 

1. Configuracion de NodeRed - [Pr3](../Pr_3/code/ex05.md)
1. Configuracion del Broker - [Pr6](../Pr_6/code/mosquitto.conf) 
1. Servidor lighttp -  [Pr6](../Pr_6/code/)
1. Codigo del Nodo 0 - [PrX](code/main_zero.py) 
1. Codigo del Nodo 1 - [Pr7](../Pr_7/code/main.py)
1. Codigo del Nodo 2 - [TBC]



Extracto del Micropthon Nodo 1

    payload = {
    "temp": simulated_temp,
    "count": count}
    msg = ujson.dumps(payload).encode('utf-8')          
    client.publish('hello', msg)

Extracto de javascript del servidor lighttp

    if (topic = 'topic_disco') {
      updateTemperature(lectura.temperatura); 
    } else if (topic = 'hello') 
    {
      updateCurrent(lectura.temp, 20.0); 
      document.getElementById("timestamp").innerHTML = lectura.count;
    }

