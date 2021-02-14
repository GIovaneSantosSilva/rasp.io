const fs = require('fs');

/**
 * Function builder
 */
function Gpio() {
    this._gpio = null;
    this._mode = this.OUTPUT;
    this._value = undefined;
}

/**
 * Contants
 */
Gpio.prototype.LOW = 0;
Gpio.prototype.HIGH = 1;
Gpio.prototype.INPUT = 'in';
Gpio.prototype.OUTPUT = 'out';
Gpio.prototype.PATH_SYS = '/sys/class/gpio/';

/**
 *
 *
 * @param {Number} _gpio
 * @param {String} _mode
 * @param {Number} _value
 * @returns {Promise<void>}
 */
Gpio.prototype.open = async function(_gpio, _mode, _value) {
    if(!_gpio) {
        throw new Error("gpio is not found");
    }
    if(_gpio) {
        this._gpio = _gpio;
        await this.export();
    }
    if(_mode) {
        this._mode = _mode;
        await this.setMode();
    }
    if(_value) {
        this._value = _value;
        await this.write();
    }
}

/**
 * Set mode in|out
 *
 * @param {Number} _gpio
 * @param {String} _mode
 * @returns {Promise<unknown>}
 */
Gpio.prototype.setMode = function(_gpio = null, _mode= null) {
    const gpio = _gpio ?? this._gpio;
    const mode = _mode ?? this._mode;
    if (!gpio) {
        throw new Error("gpio is not found");
    }
    if (mode === this.INPUT || mode === this.OUTPUT) {
        return new Promise(resolve => {
            fs.writeFile(`${this.PATH_SYS}gpio${gpio}/direction`, String(mode).toLowerCase(), error => {
                if (error) {
                    throw new Error(error.message);
                }
                return resolve();
            });
        });
    }
    throw new Error("mode type is not valid");
}

/**
 * Export gpio
 * 
 * @param {Number} _gpio 
 */
Gpio.prototype.export = async function(_gpio= null) {
    const gpio = _gpio ?? this._gpio;
    const isExported = await this.exported();
    return new Promise(resolve => {
        if (isExported) {
            return resolve();
        }
        if (!isExported) {
            fs.writeFile(`${this.PATH_SYS}export`, gpio, error => {
                if (error) {
                    throw new Error(error.message);
                }
                return resolve();
            });
        }
    });
}

/**
 * Validate exported gpio
 *
 * @param {Number} _gpio
 * @returns {Promise<unknown>}
 */
Gpio.prototype.exported = function(_gpio = null) {
    const gpio = _gpio ?? this._gpio;
    return new Promise(resolve => {
        fs.readdir(this.PATH_SYS, (error, files) => {
            if (error) {
                throw new Error(error.message);
            }
            const isExported = files.indexOf(`gpio${gpio}`) >= 0;
            return resolve(isExported);
        });
    });
}

/**
 * Read value in gpio
 *
 * @param {Number} _gpio
 * @returns {Promise<unknown>}
 */
Gpio.prototype.read = function(_gpio) {
    const gpio = _gpio ?? this._gpio;
    return new Promise(resolve => {
        fs.readFile(`${this.PATH_SYS}gpio${gpio}/value`, 'utf8', (error, data) => {
            if (error) {
                throw new Error(error.message);
            }
            return resolve(data.replace(/(\n)/gm, ""));
        });
    })
}

/**
 * Write in gpio
 *
 * @param {Number} _gpio
 * @param {Number} _value
 * @returns {Promise<unknown>}
 */
Gpio.prototype.write = function(_gpio, _value) {
    const gpio = _gpio ?? this._gpio;
    const value = _value ?? this._value;
    return new Promise((resolve, reject) => {
        fs.writeFile(`${this.PATH_SYS}gpio${gpio}/value`, String(value), error => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
}

/**
 * Pulse in gpio
 *
 * @param {Number} _gpio
 * @param {Number} time
 * @returns {Promise<unknown>}
 */
Gpio.prototype.pulse = function(_gpio, time) {
    const gpio = _gpio ?? this._gpio;
    return new Promise(async resolve => {
        const value = await this.read(gpio);
        await this.write(gpio, Number(!value))
        setTimeout(async () => {
            await this.write(_gpio, value);
            return resolve();
        }, time);
    });
}

module.exports = new Gpio;