const Gpio = require('./lib/gpio');

async function turnOnLed() {
    await Gpio.open(13, Gpio.OUTPUT, Gpio.HIGH);
    const value = await Gpio.read(13);
    if(value) {
        await Gpio.write(13, Gpio.LOW);
    }
}

turnOnLed();