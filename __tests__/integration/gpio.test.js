const Gpio = require('../../lib/gpio');

describe('Raspberry Pi', () => {

    it('exported gpio', async () => {
        const exported = await Gpio.exported(13);
        expect(exported).toBe(true);
    });

    it('export gpio', async () => {
        
    });

});