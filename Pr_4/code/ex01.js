bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.SmallSquare)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Square)
})
bluetooth.advertiseUid(
    9,
    0,
    7,
    true)
bluetooth.setTransmitPower(7)
bluetooth.startLEDService()
bluetooth.startTemperatureService()
bluetooth.startAccelerometerService()
basic.showIcon(IconNames.Square)