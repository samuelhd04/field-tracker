const Project = require("../models/Project");

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener proyectos");
    }
};

const postProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al guardar proyecto");
    }
};

const deleteProject = async (req, res) => {
    try {
        await Project.deleteOne({ _id: req.params.id });
        res.status(200).send("Borrado!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al borrar proyecto");
    }
};

module.exports = {
    getProjects,
    postProject,
    deleteProject,
};
