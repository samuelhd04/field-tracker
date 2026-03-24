const Note = require("../models/Note");

const getTextos = async (req, res) => {
    const resultados = await Note.find({ projectId: req.params.id });
    res.json(resultados);
};

const postNota = async (req, res) => {
    try {
        const nuevaNota = new Note(req.body);
        await nuevaNota.save();
        res.send("Item guardado con éxito");
    } catch (error) {
        res.status(500).send("Error al guardar");
    }
};

const deleteNota = async (req, res) => {
    await Note.deleteOne({ _id: req.params.id });
    res.send("Borrado!");
};

module.exports = {
    getTextos,
    postNota,
    deleteNota,
};
