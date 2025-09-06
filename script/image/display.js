import { DisplayProperties } from "./properties.js";

export class Display {
    constructor(displayProperties) {
        this.displayProperties = displayProperties;
    }

    get Properties() {
        return this.displayProperties;
    }

    set Properties(displayProperties) {
        if(!(displayProperties instanceof DisplayProperties)) {
            throw new Error(Object.keys({displayProperties})[0] + ' incorrect object');
        }
        this.displayProperties = displayProperties;
    }

    get Canvas() {
        return this.canvas;
    }

    set Canvas(canvas) {
        if (canvas === HTMLCanvasElement) {
            throw new Error(Object.keys({canvas})[0] + ' is not a canvas');
        }
        this.canvas = canvas;
    }

    createImage(pixelArray) {

        if(!Array.isArray(pixelArray)) {
            throw new Error(Object.keys({pixelArray})[0] + ' is not an Array');
        }

        if(!Array.isArray(pixelArray[0])) {
            throw new Error(Object.keys({pixelArray})[0] + ' is not a 2D-Array');
        }

        if((pixelArray.length < 1) && (pixelArray[0].length < 1)) {
            throw new Error(Object.keys({pixelArray})[0] + ' is empty');
        }

        let width = pixelArray[0].length * this.displayProperties.Pixel + (pixelArray[0].length - 1) * this.displayProperties.Border;
        let height = pixelArray.length * this.displayProperties.Pixel + (pixelArray.length - 1) * this.displayProperties.Border;

        this.Canvas.width = width;
        this.Canvas.height = height;
        this.Canvas.style.border = '1px solid #cacaca';

        let context = this.Canvas.getContext('2d');
        
        context.fillStyle = this.displayProperties.BackGround.Hex;
        context.fillRect(0, 0, width, height);

        for (let y = 0; y < pixelArray.length; y++) {
            for (let x = 0; x < pixelArray[0].length; x++) {
                if (pixelArray[y][x]) {
                    context.fillStyle = this.displayProperties.ForeGround.Hex;
                    context.fillRect(
                        x * (this.displayProperties.Pixel + this.displayProperties.Border),
                        y * (this.displayProperties.Pixel + this.displayProperties.Border),
                        this.displayProperties.Pixel,
                        this.displayProperties.Pixel
                    );
                }
            }
        }
    }
}
