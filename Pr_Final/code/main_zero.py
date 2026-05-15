import paho.mqtt.client as mqtt
from gpiozero import Button, LED
from signal import pause

# --- Config ---
BROKER = "pi4"
CLIENT_ID = "RPi_e0d3738fd6ed"
TOPIC_DATA = "zero/threshold"
TOPIC_RELAY = "zero/relay"

# --- Hardware ---
# We use 'LED' for the relay because it has simple .on() and .off() methods
relay = LED(18) 
relay.off() # Ensure it starts off

buttons = {
    "A": Button(17),
    "B": Button(27),
    "C": Button(22),
    "D": Button(23)
}

values = {
    "A": "23.7", 
    "B": "25.0", 
    "C": "28.5", 
    "D": "30.0"
}

# --- MQTT Logic ---
def on_connect(client, userdata, flags, rc, properties):
    if rc == 0:
        print("Connected! Listening for relay commands...")
        client.subscribe(TOPIC_RELAY)
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
    client.publish(TOPIC_DATA, val, qos=1)
    print(f"Sent {val} to {TOPIC_DATA}")

# --- Initialize ---
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, CLIENT_ID)
client.on_connect = on_connect
client.on_message = on_message

client.connect(BROKER, 1883)
client.loop_start()

# Link the 4 buttons
for label, btn in buttons.items():
    # We use 'l=label' to make sure the button remembers its OWN name
    btn.when_pressed = lambda l=label: send_val(l)
    print(f"Button {label} configured to send {values[label]}")

print(f"System Ready. Send 'ON' or 'OFF' to {TOPIC_RELAY}")
pause()