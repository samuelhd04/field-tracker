const mongo = require("mongoose");

const noteSchema = new mongo.Schema({
    nombre: String,
    texto: String,
});

const Note = mongo.model("Note", noteSchema);

module.exports = Note;
