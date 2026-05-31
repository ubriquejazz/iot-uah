from machine import Pin
import time

# Configure GPIO 2 as an input with an internal pull-up resistor
button = Pin(2, Pin.IN, Pin.PULL_UP)

# Configure the GPIO 14 as an output
flash_led = Pin(14, Pin.OUT)

print("Press the button to toggle the flash LED...")

while True:
    # Read the state of the button (0 = Pressed, 1 = Released)
    button_state = button.value()
    
    if button_state == 0:
        flash_led.value(1)  # Turn flash ON when pressed
        print("Button Pressed - Flash ON")
    else:
        flash_led.value(0)  # Turn flash OFF when released
        
    time.sleep(0.1)  # Small delay to debounce and save CPU cycles


# Turn on the flash LED (GPIO 4)
flash_led.value(1)
print("Flash ON")

time.sleep(2)  # Keep the flash on for 2 seconds

# Turn the flash OFF
flash_led.value(0)
print("Flash OFF")

