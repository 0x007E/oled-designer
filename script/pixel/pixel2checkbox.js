export class Pixel2CheckBox {

    constructor(pixelX, pixelY) {
        this.PixelX = pixelX;
        this.PixelY = pixelY;
    }
    
    get PixelX() {
        return this.pixelX;
    }

    set PixelX(pixelX) {
        if (isNaN(pixelX) || pixelX < 8 || (pixelX%8) != 0) {
            throw new Error(Object.keys({pixelX})[0] + ' is not a number or < 8 or not a multiple of 8!');
        }
        this.pixelX = pixelX;
    }

    get PixelY() {
        return this.pixelY;
    }

    set PixelY(pixelY) {
        if (isNaN(pixelY) || pixelY < 8 || (pixelY%8) != 0) {
            throw new Error(Object.keys({pixelY})[0] + ' is not a number or < 8 or not a multiple of 8!');
        }
        this.pixelY = pixelY;
    }

    createCheckBoxArray(pixelArray) {

        if(pixelArray && pixelArray.length > 0) {
            if(Array.isArray(pixelArray) && Array.isArray(pixelArray[0])) {
                this.PixelX = pixelArray[0].length;
                this.PixelY = pixelArray.length * 8;
            }
        }
       
        let rowsArray = [];

        for (let y = 0; y < this.PixelY; y++) {
            let row = $('<div class="pixel-row"></div>');

            for (let x = 0; x < this.PixelX; x++) {
                
                let checkbox = `<input class="form-check-input pixel-checkbox" type="checkbox" id="pixel${x}_${y}">`;

                if (Array.isArray(pixelArray) && Array.isArray(pixelArray[0])) {
                    let byteIndex = Math.floor(y / 8);
                    let bitPosition = y % 8;
                    let byteValue = pixelArray[byteIndex][x];
                    let isPixelSet = (byteValue & (1 << bitPosition)) !== 0;

                    if (isPixelSet) {
                        checkbox = `<input class="form-check-input pixel-checkbox" type="checkbox" id="pixel${x}_${y}" checked>`;
                    }
                }
                row.append(checkbox);
            }
            rowsArray.push(row);
        }
        return rowsArray;
    }
}
