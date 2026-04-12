// 1. Access the specific characteristic buffer
var rawData = msg.payload.characteristics["e95dca4b251d470aa062fa1922dfa9a8"];

if (rawData) {
    // 2. Convert to a Buffer object to use internal methods
    var buf = Buffer.from(rawData);
    
    // 3. Use readInt16LE to handle the signed 16-bit math and Little Endianness
    // This replaces your manual bit-shifting and 'X - 65535' logic.
    var accX = buf.readInt16LE(0);
    
    msg.payload = accX;
    return msg;
}

return null; // Don't send anything if the characteristic is missing