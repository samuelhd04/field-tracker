import db from "../db";
import { ObjectId } from "bson";

const getProjects = async () => {
    try {
        const response = await fetch("/api/projects");
        const projects = await response.json();

        if (response.ok) {
            await db.proyectos.bulkPut(projects);
        }
    } catch (err) {
        console.log("Error al obtener proyectos");
    }
};

const postProject = async ({ name, description }) => {
    try {
        const response = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: name, descripcion: description }),
        });

        const project = await response.json();

        db.proyectos.add(project);
    } catch (err) {
        const id = new ObjectId().toString();

        const project = {
            _id: id,
            nombre: name,
            descripcion: description,
        };

        db.proyectos.add(project);

        db.pendientes.add({
            proyecto: project,
            tabla: "proyectos",
            tipo: "POST",
            ruta: "/api/nuevoProyecto",
            sincronizado: false,
        });
    }
};

const deleteProject = async (id) => {
    try {
        await fetch(`/api/projects/${id}`, {
            method: "DELETE",
        });

        db.proyectos.delete(id);
    } catch (err) {
        console.log("Error al borrar proyecto");
    }
};

export { getProjects, postProject, deleteProject };
