import paho.mqtt.client as mqtt
import json
from gpiozero import Button, LED
from signal import pause

# --- Config ---
with open("config.json", "r") as f:
    config = ujson.load(f)
    f.close()

mqtt_server = config["mqtt_server"]
topic_data = config["topic_thold"]
topic_relay = config["topic_relay"]

CLIENT_ID = "RPi_e0d3738fd6ed"

# --- Hardware ---
# We use 'LED' for the relay because it has simple .on() and .off() methods
relay = LED(16) 
relay.off() # Ensure it starts off

buttons = {
    "A": Button(20),
    "B": Button(21)
}

values = {
    "A": "23.7", 
    "B": "30.0"
}

# --- MQTT Logic ---
def on_connect(client, userdata, flags, rc, properties):
    if rc == 0:
        print("Connected! Listening for relay commands...")
        client.subscribe(topic_relay)
    else:
        print(f"Failed to connect. Code: {rc}")

def on_message(client, userdata, msg):
    command = msg.payload.decode().upper()
    
    if command == "ON":
        relay.on()
    elif command == "OFF":
        relay.off()
    elif command == "TOGGLE":
        relay.toggle()  # Built-in gpiozero method
    
    status = "ON" if relay.is_active else "OFF"
    print(f"Relay is now: {status}")

def send_val(label):
    val = values[label]
    client.publish(topic_data, val, qos=1)
    print(f"Sent {val} to {topic_data}")

# --- Initialize ---
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, CLIENT_ID)
client.on_connect = on_connect
client.on_message = on_message

client.connect(mqtt_server, 1883)
client.loop_start()

# Link the 4 buttons
for label, btn in buttons.items():
    # We use 'l=label' to make sure the button remembers its OWN name
    btn.when_pressed = lambda l=label: send_val(l)
    print(f"Button {label} configured to send {values[label]}")

print(f"System Ready. Send 'ON' or 'OFF' to {topic_relay}")
pause()