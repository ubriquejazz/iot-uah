import time
from umqttsimple import MQTTClient
import ubinascii
import machine
import micropython

import network
import esp
esp.osdebug(None)
import gc

gc.collect()

ssid = 'Flybox_3AE8'
password = '34823743'

#EXAMPLE IP ADDRESS
mqtt_server = '192.168.1.100'
mqtt_user = 'REPLACE_WITH_YOUR_MQTT_USERNAME'
mqtt_pass = 'REPLACE_WITH_YOUR_MQTT_PASSWORD'

#EXAMPLE IP ADDRESS
mqtt_server = '192.168.1.144'

client_id = ubinascii.hexlify(machine.unique_id())
topic_sub = b'output'
topic_pub = b'temp'

last_sensor_reading = 0
readings_interval = 5

station = network.WLAN(network.STA_IF)

station.active(True)
station.connect(ssid, password)

while station.isconnected() == False:
  pass

print('Connection successful')
print(station.ifconfig())
