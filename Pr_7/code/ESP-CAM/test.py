
import camera, json
from umqttsimple import MQTTClient


camera.init(0, format=camera.JPEG)
camera.framesize(camera.FRAME_VGA)
camera.capture()
camera.deinit()

with open("config.json", "r") as f:
    config = ujson.load(f)

client = MQTTClient("test_id", config["mqtt_server"], user=config["mqtt_user"], password=config["mqtt_pass"])
client.connect()
print("Success!")
