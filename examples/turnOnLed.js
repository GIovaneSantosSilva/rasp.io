const Gpio = require('../lib/gpio');

const turnOnLed = async () => {
    const LED = 13;
    await Gpio.open(LED, Gpio.OUTPUT, Gpio.LOW);
    await Gpio.write(LED, Gpio.HIGH);
    const value = Gpio.read(LED);
    console.log(value);
}

turnOnLed().then(() => {
    console.log('Success');
});