# MQTT con SSL/TSL

Jose Miguel Gimeno

Juan M. Gago (27/05)

En esta práctica se introducen las comunicaciones MQTT con seguridad (autenticación).

## 1. MQTT con user/password

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

## 2. MQTT con user/password en Node-RED

Instalar Node.js y node-RED en Windows. Crear en Node-RED un flow con nodos MQTTs con seguridad user/password:

![](fig/flow_p4.png)

Capturamos la comunicación entre ambos nodos

![wireshark]()

## 3. Seguridad en MQTT usando SSL/TSL

Instalar OpenSSL y crear los diferentes certificados y keys. 

![placeholder]()

Arrancar mosquitto broker con seguridad SSL/TSL y comunicar los clientes mosquitto_pub y mosquitto_sub (consola). 

Capturar los paquetes obtenidos y vemos que son indescifrables:

![wireshark]()

## 4. Seguridad usando SSL/TSL en Node-RED

Modificar el flow del ejercicio anterior y comprobar su correcto funcionamiento con SSL/TSL.

![](fig/flow_p4.png)

Capturar la pantalla de debug de Node-RED para añadir evidencia de funcionamiento:

![msg_dbg]()
