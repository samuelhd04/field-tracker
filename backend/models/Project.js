const mongo = require("mongoose");

const projectSchema = new mongo.Schema(
    {
        nombre: String,
        descripcion: String,
    },
    { timestamps: true },
);

const Project = mongo.model("Project", projectSchema);

module.exports = Project;
