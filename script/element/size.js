export class Size {
    constructor(width, height) {
      this.Width = width;
      this.Height = height;
    }

    get Width() {
        return this.width;
    }

    set Width(width) {
        if (isNaN(width) || width < 1) {
            throw new Error(Object.keys({width})[0] + ' is not a number or < 1!');
        }
        this.width = width;
    }

    get Heigth() {
        return this.height;
    }

    set Height(height) {
        if (isNaN(height) || height < 1) {
            throw new Error(Object.keys({height})[0] + ' is not a number or < 1!');
        }
        this.height = height;
    }
}