# Visualizadores gráficos con Javascript

A continuación se muestran varios ejemplos de ficheros HTML que pretenden enseñar la forma de visualizar datos recibidos desde un servidor MQTT

1. Página básica de texto de HTML
2. Cambiando el texto desde una función de JavaScritp
3. Representa el valor de una variable en JavaScritp
4. Utiliza la librería de Cliente MQTT sobre WebSockets
5. Cliente MQTT leyendo varias variables en un JSON
6. Representa los valores en una tabla
7. Visualización en barra horizontal
8. Utilizando [canvas](https://www.w3schools.com/graphics/canvas_intro.asp) en HTML
9. Uso de librerías de controles predefinidas
10. Uso de la librería Chart.js

## Ejemplo 4

![](fig/node-flow.png)

## Ejemplo 7

<img src="fig/zona_critica.png" style="zoom:50%;" />

## lighttp server (RPi)

sudo apt-get install lighttpd

Set Permissions: Set the www-data user and group as owners of /var/www to manage files easily:

sudo chown -R www-data:www-data /var/www
sudo chmod -R 775 /var/www
sudo usermod -a -G www-data pi

Verify: Open a web browser and enter the Raspberry Pi's IP address to see the default Lighttpd page.
Web files are served from /var/www/html

Restart/Reload:

sudo service lighttpd force-reload

## Python module

Provided you start the server in the same directory where you have your HTML file:

$ python -m http.server
Serving HTTP on 0.0.0.0 port 8000 ...
