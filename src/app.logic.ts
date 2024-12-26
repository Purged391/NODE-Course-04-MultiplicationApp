import * as fs from 'fs';
import {yarg} from './config/plugins/args.plugin';

const {b:base, l:limit, s:show } = yarg;

let outputMessage: string = '';
const headerMessage: string = `
=============================
      Tabla del ${base}
=============================\n
`;

function multiply(a: number) {
  for (let i = 1; i <= limit; i++) {
    var result = a * i;
    outputMessage += `${a} x ${i} = ${result}\n`;
    }
}

multiply(base);
outputMessage = headerMessage + outputMessage;
if (show) console.log(outputMessage);

const outputPath = 'outputs';

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log(`Archivo tabla-${base}.txt creado`);