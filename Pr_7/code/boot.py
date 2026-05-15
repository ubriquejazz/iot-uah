try:
  import usocket as socket
except:
  import socket

import micropython
import time
import machine
import network
import esp
esp.osdebug(None)

import gc
gc.collect()

ssid = 'Flybox_3AE8'
password = '34823743'

station = network.WLAN(network.STA_IF)
station.active(True)
station.connect(ssid, password)
while station.isconnected() == False:
  pass

print('Connection successful')
print(station.ifconfig())
