const Project = require("../models/Project");

const getProjects = async (req, res) => {
    const resultados = await Project.find();
    res.json(resultados);
};

const postProject = async (req, res) => {
    try {
        const nuevoProyecto = new Project(req.body);
        await nuevoProyecto.save();
        res.send("Proyecto guardado con éxito");
    } catch (error) {
        res.status(500).send("Error al guardar");
    }
};

const deleteProject = async (req, res) => {
    await Project.deleteOne({ _id: req.params.id });
    res.send("Borrado!");
};

module.exports = {
    postProject,
    getProjects,
    deleteProject,
};
