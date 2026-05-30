# BLE / Micro:bit

Juan Manuel Gago

Jose Miguel Gimeno

El objetivo de esta práctica es ver como leer, escribir, cambiar notificación de las características de los servicios ofrecidos por un dispositivo con ‘peripheral role’ desde un dispositivo ‘central role’. El hardware usado en esta práctica es:

- Un placa BBC Micro:bit V2.
- Una Raspeberry PI 4.
- Un dongle Nordic nRF52840.

**Microbit V2.0**

En la figura siguiente se muestra el aspecto de **[makecode](https://makecode.microbit.org/#editor)** y la aplicación BLE usada en esta práctica:

```
...
bluetooth.advertiseUid(9,0,7,true)
bluetooth.setTransmitPower(7)
bluetooth.startUartService()
bluetooth.startIOPinService()
bluetooth.startTemperatureService()
bluetooth.startAccelerometerService()
bluetooth.startLEDService()
basic.showIcon(IconNames.Square)
```

**EJERCICIO 1. nRFConnect**

Instalar **nRFConnect**, abrirlo e instalar el paquete ‘Bluetooth Low Energy’.

- Conectar el dongle nRF52840.
- Abrir (desde nRFConnect) ‘Bluetooth Low Energy’ y conectarse con la MicroBit
- Comprobar MAC y los servicios LED y Accelerometer.

![](fig/nrfConnect.png)

Nuestras microbits tienen las MAC:

- Jose Miguel d9:05:09:08:B3:C6 
- Juan Manuel e0:d3:73:8f:d6:ed

**EJERCICIO 2. Node-RED: Acelerómetro**

- Añadir el código necesario para representar las componentes X, Y, Z en el chart.
- Cada vez que se lee el acelerómetro la fila 3 de la matriz de LEDs haga un toggle.

| NRed | UI |
|------|----|
| . | ![](fig/image.png)|

**Nota: envio a una característica de la Micro:bit**

Hemos enviado 5 bytes a la característica ‘LED matrix state’:

![](fig/node_red_leds.png)

**EJERCICIO 3. Node-RED: Temperatura**

- Quitar el servicio de acelerómetro y añadir a la Microbit el servicio de temperatura.
- Añadir todos los nodos necesarios en Node-RED para leer la temperatura cada 2 segundos 
- Representarlos en un chart, en un rango de 0 ºC a 50 ºC.

| NRed | UI |
|------|----|
| ![](fig/ex03_temp_2s.png) | . |

**EJERCICIO 4. Javascript: Acelerometro**

- Comprobar el funcionamiento del [código](code/ex04.js), cambiando el periodo de notificación a 160 ms:

  

![](fig/script.PNG)

Nota: el script [test_ble](test_ble.js) es el original del handout. Aqui usamos la version procesada por la IA.

**EJERCICIO 5. Propuesta OPCIONAL.**

- El programa anterior almacena el valor del acelerómetro en la variable global **acc**
- Esa variable global es representada en un chart del dashboard de Node-RED.

| NRed | UI |
|------|----|

**EJERCICIO 6.**

Reprogramar la Microbit quitando el servicio de acelerómetro, temperatura y UART y añadir el **servicio IO**. Crear un flow de Node-RED que:

- Lea 3 sensores analógicos y los muestre en tres gauges del dashboard.
- Lea 3 entradas digitales y los muestre en 3 LEDs del dashboard.
- Configure 3 salidas digitales que se puedan poner a 0 y a 1 con tres botones del dashboard.
- (Opcional) Configure una salida PWM y 2 objetos del dashboard que permitan variar periodo y ciclo de trabajo.

| NRed | UI |
|------|----|
| ![](fig/ex06_gpios.png) | . |

**References**

![](fig/mbit_overview.png)

| Temperatura | IO Pin |
|---|---|
|![](fig/image-1.png)|![](fig/image-2.png)|

El significado de mas servicios, características, UUIDs, etc., se pueden ver en detalle en su [documentación](https://lancaster-university.github.io/microbit-docs/resources/bluetooth/bluetooth_profile.html). 

Microbit [pinout](https://makecode.microbit.org/device/pins)
