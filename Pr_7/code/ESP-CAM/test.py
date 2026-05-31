import camera
import time, gc

# 1. Initialize with your working JPEG settings
try:
    camera.init(0, format=camera.JPEG)
    camera.framesize(camera.FRAME_VGA)
    camera.quality(10) # High quality, lower compression means more structural detail
    print("Camera ready for JPEG scanning loop.")
except Exception as e:
    print("Init failed:", e)

# 2. Grab a frame
gc.collect()
img = camera.capture()

if img:
    print("Successfully captured JPEG image!")
    print("Total JPEG payload size: %d bytes" % len(img))
    
    # Look at the first 10 bytes to verify standard JPEG headers (should start with 0xff 0xd8)
    header = [hex(img[i]) for i in range(10)]
    print("JPEG Hex Header bytes:", header)
else:
    print("Failed to capture image asset.")

camera.deinit()