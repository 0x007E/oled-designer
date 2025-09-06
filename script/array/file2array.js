export class File2Array {

    constructor(file) {
        this.File = file;
    }
    
    get File() {
        return this.file;
    }

    set File(file) {
        if (!file) {
            throw new Error(Object.keys({file})[0] + ' is NULL!');
        }
        this.file = file;
    }

    getArray() {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = function(e) {
                let text = e.target.result;
                let arrayText = text.match(/\{([\s\S]*)\}/m);
                if (!arrayText) {
                    return reject(new Error('No valid array found!'));
                }
                arrayText = arrayText[1];
                let rows = arrayText.match(/\{[^\}]*\}/g);
                if (!rows) {
                    return reject(new Error('No data found!'));
                }
                
                let displayArray = rows.map(row => {
                    let values = row.match(/0x[0-9a-fA-F]+/g);
                    return values ? values.map(val => parseInt(val, 16)) : [];
                });
                resolve(displayArray);
            };
            reader.onerror = reject;
            reader.readAsText(this.file);
        });
    }
}