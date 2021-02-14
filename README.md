# Rasp.io

> Modern Raspberry gpio control using node.js

## Table of contents

## Getting started

### Installation

```shell
npm install rasp.io
```
or
```shell
yarn add rasp.io
```
### Usage

#### Example

```js
const LED = 13;
await Gpio.open(LED, Gpio.OUTPUT, Gpio.LOW);
await Gpio.write(LED, Gpio.HIGH);
```

## Constants

### LOW

- Type: `Number`
- Value: `0`

### HIGH

- Type: `Number`
- Value: `1`

### OUTPUT

- Type: `String`
- Value: `out`

### INPUT

- Type: `String`
- Value: `in`

### PATH_SYS

- Type: `String`
- Value: `/sys/class/gpio/`

## Methods

### open()

Open pin using export and define mode.

````js
const LED = 13;
await Gpio.open(LED, Gpio.OUTPUT, Gpio.LOW);
````

### setMode()

Change mode gpio for out or in.

````js
const LED = 13;
await Gpio.setMode(LED, Gpio.INPUT);
await Gpio.setMode(LED, Gpio.OUTPUT);
````

### export()

Export gpio.

````js
const LED = 13;
await Gpio.export(LED);
````

### exported()

Verify if exported gpio.

````js
const LED = 13;
await Gpio.exported(LED);
````

### read()

Read value in gpio.

````js
const LED = 13;
await Gpio.read(LED);
````

### write()

Write value in gpio.

````js
const LED = 13;
await Gpio.write(LED, Gpio.LOW);
await Gpio.write(LED, Gpio.HIGH);
````

### pulse()

Change value in gpio. 

````js
const LED = 13;
await Gpio.pulse(LED, 2000);
````

## License

[MIT](https://opensource.org/licenses/MIT) © [Giovane Santos](https://giovanesantossilva.github.io/)