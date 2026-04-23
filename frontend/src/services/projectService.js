import db from "../db";
import { ObjectId } from "bson";

const getProjects = async () => {
    const response = await fetch("/api/projects");
    const projects = await response.json();

    if (response.ok) {
        await db.proyectos.bulkPut(projects);
    }
};

const postProject = async ({ nombre, descripcion }) => {
    try {
        const doc = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, descripcion }),
        });

        const test = await doc.json();

        db.proyectos.add(test);
    } catch (error) {
        const newID = new ObjectId().toString();

        const objeto = {
            _id: newID,
            nombre: nombre,
            descripcion: descripcion,
        };

        db.proyectos.add(objeto);

        db.pendientes.add({
            objeto: objeto,
            tabla: "proyectos",
            tipo: "POST",
            ruta: "/api/nuevoProyecto",
            sincronizado: false,
        });
    }
};

const deleteProject = async (id) => {
    await fetch(`/api/projects/${id}`, {
        method: "DELETE",
    });

    db.proyectos.delete(id);
};

export { getProjects, postProject, deleteProject };
