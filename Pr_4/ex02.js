var buf = msg.payload.characteristics.e95dca4b251d470aa062fa1922dfa9a8; 
var axi_01 = new Int16Array(1); // 16 bits integer

axi_01 = buf[1]<<8 | buf[0];

if (axi_01 > 1024) 
    axi_01 = axi_01 - 65535; // entre +1024 y -1024 

msg.payload = axi_01;
return msg;