'use strict';

const i2c = require('i2c-bus');

const BH1750_ADDR = 0x23; // Default address
const CONTINUOUS_HIGH_RES_MODE = 0x10; // OpCode to start 1lx resolution measurement
const i2c1 = i2c.openSync(1);

// We use sendByteSync because this sensor reacts to single OpCodes
i2c1.sendByteSync(BH1750_ADDR, CONTINUOUS_HIGH_RES_MODE);
console.log('Command sent. Waiting for measurement...');

// 2. Wait for the sensor to complete the conversion (Typical is 120ms)
setTimeout(() => {
    const i2cRx = Buffer.alloc(2);

    // 3. Read 2 bytes of data
    i2c1.i2cReadSync(BH1750_ADDR, 2, i2cRx);

    // The BH1750 sends [High Byte, Low Byte]
    const rawLevel = (i2cRx[0] << 8) | i2cRx[1];
    console.log(`Raw 16-bit value: ${rawLevel}`);

    // 5. Convert to Lux
    // Formula: Lux = Raw / 1.2
    const lux = rawLevel / 1.2;
    console.log(`Light Level: ${lux.toFixed(2)} lx`);

    i2c1.closeSync();
}, 200); // 200ms delay to be safe