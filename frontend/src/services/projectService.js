import db from "../db";
import { ObjectId } from "bson";
import API_URL from "../config";

const getProjects = async () => {
    try {
        const response = await fetch(`${API_URL}/api/projects`);
        const projects = await response.json();

        if (response.ok) {
            await db.proyectos.bulkPut(projects);

            const pendingProjects = await db.pendientes
                .where("tabla")
                .equals("proyectos")
                .and((task) => task.tipo === "POST")
                .toArray();

            const pendingIds = pendingProjects.map((task) => task.proyecto._id);
            const serverIds = projects.map((project) => project._id);

            const allIds = [...new Set([...pendingIds, ...serverIds])];

            await db.proyectos.where("_id").noneOf(allIds).delete();
        }
    } catch (err) {
        console.log("Error al obtener proyectos");
    }
};

const postProject = async (data) => {
    const { name, description } = data;

    try {
        const response = await fetch(`${API_URL}/api/projects`, {
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
            ruta: `/api/projects`,
        });
    }
};

const deleteProject = async (id) => {
    try {
        await fetch(`${API_URL}/api/projects/${id}`, {
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
