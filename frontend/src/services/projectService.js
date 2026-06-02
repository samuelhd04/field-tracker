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

const postProject = async (data) => {
    const { name, description } = data;

    try {
        const response = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: name, descripcion: description }),
        });

        const project = await response.json();

        await db.proyectos.put(project);
    } catch (err) {
        const id = new ObjectId().toString();

        const project = {
            _id: id,
            nombre: name,
            descripcion: description,
        };

        await db.proyectos.put(project);

        await db.pendientes.put({
            proyecto: project,
            tabla: "proyectos",
            tipo: "POST",
            ruta: "/api/projects",
        });
    }
};

const deleteProject = async (id) => {
    try {
        await fetch(`/api/projects/${id}`, {
            method: "DELETE",
        });

        await db.proyectos.delete(id);
    } catch (err) {
        await db.proyectos.delete(id);

        await db.pendientes.put({
            tabla: "proyectos",
            tipo: "DELETE",
            ruta: `/api/projects/${id}`,
        });
    }
};

export { getProjects, postProject, deleteProject };
