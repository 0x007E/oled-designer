export class Array2Text {

    constructor() {
        this.Notation = 16;
    }

    get Notation() {
        return this.notation;
    }

    set Notation(notation) {
        if (isNaN(notation) || notation < 1) {
            throw new Error(Object.keys({notation})[0] + ' is not a number or < 1!');
        }
        this.notation = notation;
    }

    get Bytes() {
        return this.bytes;
    }

    set Bytes(bytes) {
        if (isNaN(bytes) || bytes < 1) {
            throw new Error(Object.keys({bytes})[0] + ' is not a number or < 1!');
        }
        this.bytes = bytes;
    }

    createString(pixelArray) {

        if(!Array.isArray(pixelArray)) {
            throw new Error(Object.keys({pixelArray})[0] + ' is not an Array');
        }

        if(!Array.isArray(pixelArray[0])) {
            throw new Error(Object.keys({pixelArray})[0] + ' is not a 2D-Array');
        }

        if((pixelArray.length < 1) && (pixelArray[0].length < 1)) {
            throw new Error(Object.keys({pixelArray})[0] + ' is empty');
        }

        let rows = pixelArray.length;
        let columns = pixelArray[0].length;

        this.Bytes = columns * rows / 8;

        let result = 'const unsigned char frame_background[' + (rows / 8) + '][' + columns + '] PROGMEM = {\n';

        for (let block = 0; block < (rows / 8); block++) {

            result += '\t{\n';

            for (let x = 0; x < columns; x++) {
                let byteVal = 0;

                if ((x %8) == 0) {
                    result += '\t\t'
                }

                for (let bit = 0; bit < 8; bit++) {

                    let y = block * 8 + bit;

                    if (pixelArray[y][x]) {
                        byteVal |= (1<<bit);
                    }
                }

                if (this.Notation == 16) {
                    result += '0x' + byteVal.toString(16).toUpperCase().padStart(2, '0');
                } else if (this.Notation == 2) {
                    result += '0b' + byteVal.toString(2).padStart(8, '0');
                } else {
                    result += byteVal.toString(10);
                }

                if (x < (columns - 1)) {
                    result += ', ';
                }

                if (((x + 1) %8) == 0) {
                    result += '\n'
                }
            }
            result += '\t}';

            if (block < (rows / 8) - 1) {
                result += ',\n';
            }
        }
        result += '\n};';

        return result;
    }
}