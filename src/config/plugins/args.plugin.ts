import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

export const yarg = yargs(process.argv)
.option('b', {
    alias: 'base',
    describe: 'Multiplication table base',
    type: 'number',
    demandOption: true,
})
.option('l', {
    alias: 'limit',
    describe: 'Multiplication table limit',
    type: 'number',
    default: 10,
})
.option('s', {
    alias: 'show',
    describe: 'Show multiplication table in console',
    type: 'boolean',
    default: false,
})
.options('n', {
    alias: 'name',
    describe: 'File name',
    type: 'string',
    default: 'table'
})
.options('d', {
    alias: 'directory',
    describe: 'Output directory',
    type: 'string',
    default: 'outputs'
})
.check((argv, options) => {
    if (argv.b < 1) throw 'The base must be greater than 0';
    
    return true;
})
.parseSync();