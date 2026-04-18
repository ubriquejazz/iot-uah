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
topic_sub = b'notification'
topic_pub = b'hello'

station = network.WLAN(network.STA_IF)

station.active(True)
station.connect(ssid, password)

while station.isconnected() == False:
  pass

print('Connection successful')
print(station.ifconfig())
