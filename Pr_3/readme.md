# RPi, JavaScript y Node-RED

Juan Manuel Gago

Jose Miguel Gimeno

**Ejercicio 01. Interfaces en la Raspberry** 

Instalar Raspbbian y realizar los test de los dispositivos I2C, UART y GPIOs.

**Ejercico 02. Counter**

Programar el JS anterior en la Raspberry y ejecutarlo.

```
$ node count.js 
Hola desde Node.js 
Suma :1234 + 1.234 = 1235.234
Execution 1  
Execution 2  
Execution 3  
Execution 4  
Execution 5  
Interval stopped after 5 executions! 
```

Nota sobre los métodos empleados

- **setInterval**, clearInterval
- **setTimeout** 



**Ejercicio 3. LED Blinking**

Conectar un LED al pin 18 (530), programar el JS anterior y ejecutarlo.

```
~$ grep GPIO18 | cat /sys/kernel/debug/gpio
...
~/.node-red$ npm install onoff
~/.node-red$ npm list
```

Cuando usamos un script que emplea la instuccion **require("onoff")**, ha de estar en la carpeta de node-red. Hemos creado un fichero bash para hacer esto de forma automatica:

```
~/repo/uah$ ./copiar.sh Pr_3
~/repo/uah$ cd ~/.node-red
~/.node-red$ node Pr_3/ex03_blink.js
```

**Ejercicio 4. I2C Sensor** 

Conectar al bus I2C de la Raspberry un [BH1750](https://www.ti.com/lit/ds/symlink/BH1750.pdf) y un resistor variable. Programar el JS anterior y ejecutarlo tomando varias medidas según luz de la habitacion.

```
~/.node-red$ node Pr_3/ex04_bh1750.js
```

Modificar el programa anterior añadiendo un setInterval para que se tomen medidas cada 2s.

![](fig/sensor_bh1750.png)


**Ejercico 5A: Dashboard**

Instalar el bróker Mosquitto en Raspberry y arrancarlo en una consola. Partiendo de las conexiones de los ejercicios anteriores (LED en GPIO18 y BH1750), crear un ‘flow’ en Node-RED de Raspberry que:

- Muestre un chart (dashboard) en el que se visualice el valor de tensión del BH1750. Una gauge (dashboard) que visualice el valor de luminosidad (lx).
- Un LED (instalar el paquete ‘node-red-contrib-ui-led’) que indique el estado del GPIO18.

**Referencias**

<img src="fig/rasberry_pinout.jpg" alt="description" style="zoom:50%;" />
