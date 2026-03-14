//var async = require('async');
var noble = require('@abandonware/noble');
var charact = null;
var ccc = null;

noble.on('stateChange', function (state) {
    if (state === 'poweredOn') {
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', function (peripheral) {
    if (peripheral.address === 'df:63:6b:53:c8:37') {	// MAC deseada
        console.log('Found device with local name: ' + peripheral.advertisement.localName);
        console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
        console.log('peripheral.address : ' + peripheral.address);
        console.log('peripheral.uuid : ' + peripheral.uuid);
        console.log('peripheral.id : ' + peripheral.id);
        peripheral.connect(function (error) {
            console.log('connected to peripheral: ' + peripheral.uuid);

            //    peripheral.discoverServices([], function(error, services) {
            //    var deviceInformationService = services[8];

            // micro:bit accelerometer: e95d0753251d470aa062fa1922dfa9a8

            peripheral.discoverServices(['e95d0753251d470aa062fa1922dfa9a8'], function (error, services) {
                var deviceInformationService = services[0];
                console.log('discovered device information service UUID : ' + deviceInformationService.uuid);

                deviceInformationService.discoverCharacteristics(null, function (error, characteristics) {
                    console.log('discovered the following characteristics:');

                    ccc = characteristics[0];

                    ccc.on('data', function (data, isNotification) {
                        console.log('Characteristic data X:  ' + (data[1] << 8 | data[0]));
                        //	console.log('Characteristic data ---  ' + isNotification);
                        //setTimeout(function(){ ccc.read(); },1000);

                    });

                    characteristics[1].on('data', function (data, isNotification) {
                        console.log('Accelerometer period (ms):  ' + (data[1] << 8 | data[0]));
                    });

                    characteristics[0].once('descriptorsDiscover', function (descript) {
                        console.log('descriptor UUID data   ' + descript);

                    });

                    for (var i in characteristics) {
                        console.log('  ' + i + ' uuid: ' + characteristics[i].uuid);
                        console.log('  ' + i + ' uuid: ' + characteristics[i].properties);
                    }

                    var buf1 = Buffer.from([0x80, 2]);  // 640 ms => 0x280

                    characteristics[1].write(buf1, true);

                    characteristics[1].read();

                    characteristics[0].once('descriptorsDiscover', function (descript) {
                        console.log('desccriptor UUID data   ' + descript);

                        descript[0].once('valueRead', function (data) {
                            console.log('Descriptor (1 is notify) ' + data[0] + data[1]);
                        });

                        var buf = Buffer.from([1, 0]);

                        descript[0].writeValue(buf);
                        descript[0].readValue();

                    });
                    characteristics[0].discoverDescriptors();
                });
            });
        });
    }
});