# MQTT con SSL/TSL

Jose Miguel Gimeno

Juan M. Gago (27/05)

En esta práctica se introducen las comunicaciones MQTT con seguridad (autenticación).

## A1. MQTT con user/password

En primer lugar es necesario añadir al fichero de configuración del broker (mosquitto_passwd.conf) lo siguiente:

     == allow_anonymous false
    password_file c:\mosquitto\passwd_test.txt

Hay que crear un fichero de usuarios y passwords, un par user:passwd por línea. En el fichero ‘passwd_test.txt’ sólo hay un usuario (jmra: jmra1)

Ejecutamos

    $ mosquitto_passwd -U .\passwd_test.txt

A continuación se arranca el broker especificando el fichero de configuración a usar, ‘mosquitto_passwd.conf’:

    $ mosquitto -c mosquitto_passwd.conf -v

Subscriber (otra consola) 

    $ mosquitto_sub -h localhost -p 1883 -t "jmra" -u 'jmra' -P 'jmra1'

Publisher (otra consola)

    $ mosquitto_pub -h localhost -p 1883 -t "jmra" -u 'jmra' -P 'jmra1' -m 'Hola people'

Captura del paquete de conexión para ver user y password en texto plano: 

![](fig/wshark_p4.png)

## A2. MQTT con user/password en Node-RED

Instalar Node.js y node-RED en Windows. Crear en Node-RED un flow con nodos MQTTs con seguridad user/password:

![](fig/flow_p4.png)

Capturamos la comunicación entre ambos nodos

![wireshark]()

---

## B1. Seguridad en MQTT usando SSL/TSL

### Mosquitto Broker

Instalar OpenSSL y crear los diferentes certificados y keys. 

<img src="fig/cert_server.png" style="zoom:33%;" />

De la autoridad certificadora (ca.crt)

<img src="fig/cert_CA.png" alt="autoridad" style="zoom: 33%;" />

Ahora firmamos el certificado del broker con el certificado ca.crt:

<img src="fig/cert_firma.png" alt="firma" style="zoom:50%;" />

Vamos al directorio /etc/mosquitto y colocamos las keys y certificado

- ca_certificates/ aqui va el fichero **ca.crt** 
- certs/ aqui va los server certificates (chmod a+r)

El fichero mosquitto.conf quedaria asi:

    cafile /etc/mosquitto/ca_certificates/ca.crt
    certfile /etc/mosquitto/certs/server.crt
    keyfile /etc/mosquitto/certs/server.key
    tls_version tlsv1.2

Al arrancar mosquitto broker con seguridad SSL/TSL, se obtiene un error:

    sudo systemctl restart mosquitto.service
    Job for mosquitto.service failed because the control process exited with error code.
    See "systemctl status mosquitto.service" and "journalctl -xeu mosquitto.service" for details.

### Mosquitto Clients

Comunicar los clientes mosquitto_pub y mosquitto_sub (consola). 

- Script para escuchar un topic [subscriber](code/subscriber.sh)
- Script para publicar un mensaje [publisher](code/client.sh)

Capturar los paquetes obtenidos y ver que son indescifrables:

    $ ./subscriber.sh tema ca.crt
    $ ./client.sh tema "hola a todos!" ca.crt

![wireshark]()

## B2. Seguridad usando SSL/TSL en Node-RED

Modificar el flow del ejercicio anterior y comprobar su correcto funcionamiento con SSL/TSL.

![](fig/flow_p4.png)

Capturar la pantalla de debug de Node-RED para añadir evidencia de funcionamiento:

![msg_dbg]()

NOTA: No hay nada que capturar debido al error en la seccion B1