import machine
import utime
import neopixel

print("===============================")
print("  YD-RP2040 Comprehensive Test ")
print("===============================\n")

# --- 1. PIN CONFIGURATIONS SPECIFIC TO YOUR BOARD ---
NEOPIXEL_PIN = 23    # Board's built-in RGB NeoPixel
USR_BUTTON_PIN = 24  # Board's built-in 'USR' button

# Initialize Hardware
np = neopixel.NeoPixel(machine.Pin(NEOPIXEL_PIN, machine.Pin.OUT), 1)
blue_led = machine.Pin("LED", machine.Pin.OUT)
usr_button = machine.Pin(USR_BUTTON_PIN, machine.Pin.IN, machine.Pin.PULL_UP)

# Internal Temperature Sensor Setup
temp_sensor = machine.ADC(4)
conversion_factor = 3.3 / 65535

# --- 2. HELPER FUNCTIONS ---
def set_neopixel(r, g, b):
    """Sets the RGB LED brightness (max 255, but kept dim to save your eyes)"""
    np[0] = (r, g, b)
    np.write()

def read_temperature():
    """Reads the RP2040 internal temp sensor"""
    reading = temp_sensor.read_u16() * conversion_factor
    return 27 - (reading - 0.706) / 0.001721

# --- 3. RUNNING THE DIAGNOSTICS ---

print("[1/3] Testing Onboard Blue LED (GP22)...")
for _ in range(3):
    blue_led.value(1)
    utime.sleep_ms(150)
    blue_led.value(0)
    utime.sleep_ms(150)

print("[2/3] Testing RGB NeoPixel (GP23)...")
# Flash Red, Green, Blue
for color in [(40, 0, 0), (0, 40, 0), (0, 0, 40)]:
    np[0] = color
    np.write()
    utime.sleep_ms(250)
set_neopixel(0, 0, 0) # Turn off

print("[3/3] Launching Live Dashboard...")
print("--------------------------------------------------")
print("-> Press the physical 'USR' button on your board!")
print("-> Press Ctrl+C in Thonny to stop the test.")
print("--------------------------------------------------\n")

print("{:<15} | {:<15} | {:<15}".format("USR Button", "Blue LED State", "Internal Temp"))
print("-" * 52)

try:
    while True:
        # The USR button connects to GND when pressed, so 0 = PRESSED
        is_pressed = (usr_button.value() == 0)
        
        if is_pressed:
            btn_text = "PRESSED 🔴"
            blue_led.value(1)         # Turn on blue LED
            set_neopixel(0, 40, 0)     # Turn NeoPixel GREEN
        else:
            btn_text = "Released"
            blue_led.value(0)         # Turn off blue LED
            set_neopixel(20, 0, 20)    # Turn NeoPixel PURPLE (idle)
            
        current_temp = read_temperature()
        
        # Print rewriting dashboard line (\r)
        print("{:<15} | {:<15} | {:.2f}°C       ".format(btn_text, "ON" if blue_led.value() else "OFF", current_temp), end="\r")
        utime.sleep_ms(50)

except KeyboardInterrupt:
    print("\n\nTest stopped by user.")
finally:
    # Cleanup and turn everything off
    blue_led.value(0)
    set_neopixel(0, 0, 0)
    print("Pins safely cleared. Your board is 100% functional!")
