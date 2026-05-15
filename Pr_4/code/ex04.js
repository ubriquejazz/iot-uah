const noble = require('@abandonware/noble');

const TARGET_MAC = 'e0:d3:73:8f:d6:ed';
const ACCEL_SERVICE_UUID = 'e95d0753251d470aa062fa1922dfa9a8';
const ACCEL_DATA_UUID = 'e95dca4b251d470aa062fa1922dfa9a8';
const ACCEL_PERIOD_UUID = 'e95dfb11251d470aa062fa1922dfa9a8';

noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        console.log('Scanning...');
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', (peripheral) => {
    if (peripheral.address === TARGET_MAC.toLowerCase() || peripheral.id === TARGET_MAC.replace(/:/g, '')) {
        console.log(`Found micro:bit: ${peripheral.address}`);
        noble.stopScanning();

        peripheral.connect((error) => {
            if (error) return console.error(error);
            console.log('Connected!');

            // Discover only the Accelerometer Service
            peripheral.discoverServices([ACCEL_SERVICE_UUID], (error, services) => {
                const accelService = services[0];
                
                accelService.discoverCharacteristics([], (error, characteristics) => {
                    characteristics.forEach((char) => {
                        
                        // 1. Set the Update Period (Frequency)
                        if (char.uuid === ACCEL_PERIOD_UUID) {
                            const period = Buffer.from([0xA0, 0x00]); // 80ms 0x05
                            char.write(period, false, () => console.log('Period set.'));
                        }

                        // 2. Subscribe to Data Notifications
                        if (char.uuid === ACCEL_DATA_UUID) {
                            char.subscribe((err) => {
                                if (!err) console.log('Subscribed to Accelerometer');
                            });

                            char.on('data', (data) => {
                                // Micro:bit sends X, Y, Z as 16-bit Little Endian
                                const x = data.readInt16LE(0);
                                const y = data.readInt16LE(2);
                                const z = data.readInt16LE(4);
                                console.log(`X: ${x} | Y: ${y} | Z: ${z}`);
                            });
                        }
                    });
                });
            });
        });
    }
});