# BLE 

El objetivo de esta práctica es experimentar de forma real, con dispositivos físicos, los conceptos que
se han visto de forma teórica relativos al Bluetooth de baja energía (BLE), una tecnología cada vez
más en auge. Se verá como descubrir dispositivos; leer, escribir, cambiar notificación de las características de los servicios ofrecidos por un dispositivo con ‘peripheral role’ desde un dispositivo ‘central role’. Se verá también como programar cada uno de los dispositivos mencionados.

El hardware usado en esta práctica es:
- Un placa BBC Micro:bit V2.
- Una Raspeberry PI 4.
- Un dongle Nordic nRF52840.
- Un PC con Windows 10

**Microbit V2.0**

```
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.SmallSquare)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Square)
})
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Chessboard)
    bluetooth.uartWriteString("Hola desde BLE")
})
function doSomething (texto: string) {
    bluetooth.uartWriteString(texto)
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    basic.showIcon(IconNames.Heart)
})

input.onButtonPressed(Button.B, function () {
    doSomething("abc")
    basic.showIcon(IconNames.StickFigure)
})
bluetooth.advertiseUid(9,0,7,true)
bluetooth.setTransmitPower(7)
basic.showIcon(IconNames.Square)
bluetooth.startUartService()
bluetooth.startIOPinService()
bluetooth.startTemperatureService()
bluetooth.startAccelerometerService()
bluetooth.startLEDService()
bluetooth.startMagnetometerService()
```

**EJERCICIO 1. nRFConnect**

- Conectar la placa Microbit a Windows 10; Windows instalará automáticamente los driver para el puerto COM virtual y para el debugger
- Instalar **nRFConnect**, abrirlo e instalar el paquete ‘Bluetooth Low Energy’.
  - Conectar el dongle nRF52840.
  - Abrir (desde nRFConnect) ‘Bluetooth Low Energy’.
  - Comprobar los servicios LED y Accelerometer.
  - Poner en ON todos los LEDs de las filas 1 y 5.
  - Modificar el periodo de actualización de los datos del acelerómetro y modificar su descriptor para que permita notificación.


**EJERCICIO 2. Node-RED (RPi)**

- Instalar todos los módulos necesarios para poder trabajar con BLE desde Node-RED.
- Probar el ejemplo de lectura del acelerómetro.
- Añadir el código necesario para representar las componentes X, Y, Z en el chart.
- Añadir los nodos necesarios para que cada vez que se lee el acelerómetro la fila 3 de la matriz de LEDs haga un toggle.

**EJERCICIO 3. Temperatura**

- Quitar el servicio de acelerómetro y añadir a la Micro:bit el servicio de temperatura.
- Añadir todos los nodos necesarios en Node-RED para leer la temperatura cada 2 segundos y representarlos en un chart, en un rango de 0 ºC a 50 ºC.

**EJERCICIO 4. Acelerometro**
Comprobar el funcionamiento del código mostrado, cambiando el periodo de notificación a 160 ms.
Grabar un video corto en el que se muestren los resultados por la consola de Mobaxterm.


**EJERCICIO 5. Propuesta OPCIONAL.**
Crear un flow de Node-RED en el que el programa anterior, que lee el acelerómetro, almacene el valor del acelerómetro en una variable global y esa variable global sea representada en un chart del dashboard de Node-RED.