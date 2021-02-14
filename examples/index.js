const Gpio = require('../lib/gpio');

async function turnOnLed() {
    await Gpio.open(13, Gpio.OUTPUT, Gpio.HIGH);
    setTimeout(async () => {
        const value = await Gpio.read(13);
        if(value) {
            await Gpio.write(13, Gpio.LOW);
        }
    }, 2000);
}

turnOnLed().then(() => {
    console.log('Success');
});