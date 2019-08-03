// const fs = require('fs');


// fs.writeFileSync('notes.txt', 'hello world');
// fs.appendFileSync('notes.txt', 'good evening world')

const notes = require('./notes.js');
// const validator = require('validator');
// const chalk = require('chalk');
const yargs = require('yargs')
// console.log(getNotes());
// console.log(validator.isEmail('test.com'));
// console.log(chalk.green('Success'))

// const command = process.argv;
// console.log(command);

// if(command[2] === 'add'){
//     console.log('add command..')
// }
// else if(command[2] === 'remove'){
//     console.log('remove command...')
// }


yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'add notes..',
    builder: {
        title: {
            'describe': 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            'describe': 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'remove notes..',
    builder: {
        title: {
            'describe': 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title);
    }
})

yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'read notes..',
    builder: {
        title: {
            'describe': 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})

yargs.parse()