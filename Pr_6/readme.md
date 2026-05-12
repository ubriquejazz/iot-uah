# Visualizadores gráficos simples

A continuación se muestran varios ejemplos de ficheros HTML que pretenden enseñar la forma de visualizar datos recibidos desde un servidor MQTT

1. Página básica de texto de HTML
2. Cambiando el texto desde una función de JavaScritp
3. Representa el valor de una variable en JavaScritp
4. Utiliza la librería de Cliente MQTT sobre WebSockets
5. Cliente MQTT leyendo varias variables en un JSON
6. Representa los valores en una tabla
7. Visualización en barra horizontal

## Ejemplo 4

Se introduce un cliente MQTT
- Lee el topic /testtopic/nodered/1 del servidor bróker.emqx.io:8083
- Utiliza la librería Cliente MQTT sobre [WebSockets](http://www.steves-internet-guide.com/using-javascript-mqtt-clientwebsockets)

## Ejemplo 5

Cliente MQTT leyendo varias variables en un JSON:
- temperatura → Temperatura 
- iluminacion → Iluminación 
- now → Marca de tiempo (01/1970)

Ejemplo:  {"temperatura":8,"iluminacion":100,"now":15 8739421196}

El Ejemplo 6 representa estos valores en una tabla y en 7 mostramos zonas criticas:

<img src="fig/zona_critica.png" style="zoom:50%;" />

## Web-server

### Option 1: Windows PC + Python (Development)

Provided you start the server in the same directory where you have your HTML file:

    $ python -m http.server
    Serving HTTP on 0.0.0.0 port 8000 ...

### Option 2: 24/7 RPi + lighttp server

    sudo apt-get install lighttpd

Set Permissions: Set the www-data user and group as owners of /var/www to manage files easily:

    sudo chown -R www-data:www-data /var/www
    sudo chmod -R 775 /var/www
    sudo usermod -a -G www-data pi

Verify: Open a web browser and enter the Raspberry Pi's IP address to see the default Lighttpd page.
Web files are served from /var/www/html

Restart/Reload:

    sudo service lighttpd force-reload