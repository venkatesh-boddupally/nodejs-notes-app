const fs = require('fs');
const chalk = require('chalk');

const getNotes  = function (){
    return "MY notes...";
}

const readNote = (title) => {
    const data = loadNotes();
    const existNote = data.find((note) => note.title == title);
    if (existNote){
        console.log(chalk.inverse(existNote.title));
        console.log(existNote.body);
    }
    else{
        console.log(chalk.red.inverse('Note not found'))
    }
}

const addNotes = (title, body) => {
    const data = loadNotes();
    const duplicateNote = data.find((note) => note.title == title);
    if (!duplicateNote){
        data.push({
            title: title,
            body: body
        })
        saveNotes(data);
        console.log(chalk.green.inverse('Notes added successfully'));
    }
    else{
        console.log(chalk.red.inverse('Title already taken.Please take new title'));
    }
    
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);
    if(notes.length > notesToKeep.length){
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('Notes removed'));
    }
    else{
        console.log(chalk.red.inverse('No notes found for that title'));
    }
    
    
}

const listNotes = () =>{
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes...'));
    notes.forEach((note)=> console.log(chalk.green(note.title)));
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        const data = JSON.parse(dataJson);
        return data;
    }catch (e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
};