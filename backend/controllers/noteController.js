const Note = require("../models/Note");

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ projectId: req.params.id });
        res.json(notes);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener notas del proyecto");
    }
};

const postNote = async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.status(201).send("Nota guardada!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al guardar nota");
    }
};

const deleteNote = async (req, res) => {
    try {
        await Note.deleteOne({ _id: req.params.id });
        res.send("Nota borrada!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al borrar nota");
    }
};

module.exports = {
    getNotes,
    postNote,
    deleteNote,
};
