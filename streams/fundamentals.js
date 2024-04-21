
import { Readable, Writable, Transform } from 'node:stream';

class OneToOneHundred extends Readable {
    index = 1
    _read() {
        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
                
            }
            else {
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        }, 1000);
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        // const number = parseInt(chunk.toString());
        // const result = number * 10;
        // console.log(result);
        // callback();
        console.log(parseInt(chunk.toString()) * 10);
        callback();
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = parseInt(chunk.toString());
        const result = number * -1;
        callback(null, Buffer.from(String(result)));
    }
}

new OneToOneHundred()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream());
    