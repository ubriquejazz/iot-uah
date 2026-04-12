var buf = msg.payload.characteristics.e95dca4b251d470aa062fa1922dfa9a8; 
var value = new Int16Array(1); // 16 bits integer

value = buf[1]<<8 | buf[0];
if (value > 1024) value = value - 65535;

msg.payload = value;
return msg;

// Y axi
value = buf[3]<<8 | buf[2];
if (value > 1024) value = value - 65535;

msg.payload = value;
return msg;

// Z axi
value = buf[5]<<8 | buf[4];
if (value > 1024) value = value - 65535;

msg.payload = value;
return msg;