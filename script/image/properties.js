import { Color } from "../element/color.js";
import { Size } from "../element/size.js";

export class DisplayProperties {
    constructor(imageSize) {
        this.ImageSize = imageSize;
    }

    get Size() {
        return this.size;
    }

    set Size(size) {
        if(!(size instanceof Size)) {
            throw new Error(Object.keys({size})[0] + ' incorrect object');
        }
        this.size = size;
    }

    get Border() {
        return this.border;
    }

    set Border(border) {
        if (isNaN(border) || border < 1) {
            throw new Error(Object.keys({border})[0] + ' is not a number or < 1!');
        }
        this.border = border;
    }

    get Pixel() {
        return this.pixel;
    }

    set Pixel(pixel) {
        if (isNaN(pixel) || pixel < 1) {
            throw new Error(Object.keys({pixel})[0] + ' is not a number or < 1!');
        }
        this.pixel = pixel;
    }

    get ForeGround() {
        return this.foreGround;
    }

    set ForeGround(foreGround) {
        if(!(foreGround instanceof Color)) {
            throw new Error(Object.keys({foreGround})[0] + ' incorrect object');
        }
        this.foreGround = foreGround;
    }

    get BackGround() {
        return this.backGround;
    }

    set BackGround(backGround) {
        if(!(backGround instanceof Color)) {
            throw new Error(Object.keys({backGround})[0] + ' incorrect object');
        }
        this.backGround = backGround;
    }
}