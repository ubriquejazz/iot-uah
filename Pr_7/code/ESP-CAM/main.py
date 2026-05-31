import time, ujson
import camera
from umqttsimple import MQTTClient

client_id = "esp32_cam_node"

with open("config.json", "r") as f:
    config = ujson.load(f)
    f.close()

mqtt_server = config["mqtt_server"]
mqtt_user = config["mqtt_user"]
mqtt_pass = config["mqtt_pass"]

# Encoded strings to bytes for reliable MQTT comparison
topic_trig = config["topic_trig"].encode('utf-8')
topic_photo = config["topic_photo"].encode('utf-8')

try:
    camera.init(0, format=camera.JPEG)
    camera.framesize(camera.FRAME_VGA)
    camera.quality(12) 
    print("Camera initialized successfully")
except Exception as e:
    print("Camera init failed:", e)

def on_message(topic, msg):
    print(f"Received message on topic {topic}: {msg}")
    if topic == topic_trig and msg == b"capture":
        print("Taking photo...")      
        img = camera.capture()
        
        if img:
            print(f"Photo captured! Size: {len(img)} bytes. Publishing...")
            client.publish(topic_photo, img)
            print("Photo published successfully.")
        else:
            print("Failed to capture photo.")

def connect_and_subscribe():
  global client_id, mqtt_server
  #client = MQTTClient(client_id, mqtt_server)
  client = MQTTClient(client_id, mqtt_server, user=mqtt_user, password=mqtt_pass)
  client.set_callback(on_message)
  client.connect()
  client.subscribe(topic_trig)
  print('Connected to %s MQTT broker' % mqtt_server)
  return client

def restart_and_reconnect():
  print('Failed to connect to MQTT broker. Reconnecting...')
  time.sleep(10)
  machine.reset()

try:
  client = connect_and_subscribe()
except OSError as e:
  restart_and_reconnect()
count = 0

while True:
  try:
    client.check_msg()
    time.sleep(0.1)
    count += 1
  except OSError as e:
    print("Network error caught:", e)
    restart_and_reconnect()
  except KeyboardInterrupt:
    print("Disconnecting...")
    client.disconnect()
    camera.deinit()