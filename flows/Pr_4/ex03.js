var buf = msg.payload.characteristics.e95d9250251d470aa062fa1922dfa9a8;

if (buf) {
    // The temperature is a single signed byte (Int8)
    // No bit-shifting needed. 
    // .readInt8(0) handles the negative values automatically.
    msg.payload = buf.readInt8(0); 
}

return msg;