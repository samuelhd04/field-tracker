const mongo = require("mongoose");

const noteSchema = new mongo.Schema({
    nombre: String,
    texto: String,
    projectId: {
        type: mongo.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
});

const Note = mongo.model("Note", noteSchema);

module.exports = Note;
