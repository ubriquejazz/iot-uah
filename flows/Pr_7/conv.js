// msg.payload is now an object: { temp: 452, count: 0 }
if (msg.payload && msg.payload.hasOwnProperty('temp')) {
    
    let celsius = msg.payload.temp / 10;
    let currentCount = msg.payload.count;
    msg.payload = {
        temperature_C: celsius,
        message_count: currentCount
    };    
    return msg;
} else {
    node.error("Invalid JSON data packet received");
    return null;
}