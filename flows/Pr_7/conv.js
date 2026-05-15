// msg.payload arrives as a string/buffer from the MQTT node (e.g., "452")
let decimes = parseInt(msg.payload);

if (!isNaN(decimes)) {
    msg.payload = decimes / 10;       
    return msg;
} else {
    node.error("Received invalid temperature data: " + msg.payload);
    return null; // Don't pass the message forward if it's corrupted
}