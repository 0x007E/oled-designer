export class Color {
    constructor(hex) {
        let temp = hex.replace('#', '');

        // Unterstütze Kurznotation (#fff)
        if (temp.length === 3) {
            temp = temp.split('').map(ch => ch + ch).join('');
        }
        if (temp.length !== 6) {
            throw new Error(temp, Object.keys({hex})[0] + 'Hex value must be 6 digits');
        }
        
        this.#CheckIfHexValueIsNumber(temp, Object.keys({hex})[0] + ' is not a number a hex value!');

        let num = [...temp+''];

        if(num.length != 6) {
            throw new Error(Object.keys({hex})[0] + ' value can not be resolved!');
        }

        this.R = parseInt(temp.slice(0, 2), 16);
        this.G = parseInt(temp.slice(2, 4), 16);
        this.B = parseInt(temp.slice(4, 6), 16);
    }

    #CheckIfHexValueIsNumber(number, error) {

        number = '0x' + number;

        if (isNaN(number)) {
            throw new Error(error);
        }
    }

    get R() {
        return this.r;
    }

    set R(r) {
        if (isNaN(r) || r < 0 || r > 255) {
            throw new Error(Object.keys({r})[0] + ' is not a number or < 1!');
        }
        this.r = r;
    }

    get G() {
        return this.g;
    }

    set G(g) {
        if (isNaN(g) || g < 0 || g > 255) {
            throw new Error(Object.keys({g})[0] + ' is not a number or < 1!');
        }
        this.g = g;
    }

    get B() {
        return this.b;
    }

    set B(b) {
        if (isNaN(b) || b < 0 || b > 255) {
            throw new Error(Object.keys({b})[0] + ' is not a number or < 1!');
        }
        this.b = b;
    }

    get Hex() {
        return (
            '#' +
            this.R.toString(16).padStart(2, '0') +
            this.G.toString(16).padStart(2, '0') +
            this.B.toString(16).padStart(2, '0')
        ).toLowerCase();
    }
}