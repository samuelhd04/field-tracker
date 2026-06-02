import db from "../db";
import { ObjectId } from "bson";

const getNotes = async (projectId) => {
    try {
        const response = await fetch(`/api/projects/${projectId}/notes`);
        const notes = await response.json();

        if (response.ok) {
            await db.notas.bulkPut(notes);
        }
    } catch (err) {
        console.log("Error al obtener notas");
    }
};

const postNote = async (data) => {
    const { name, text, projectId } = data;

    try {
        const response = await fetch(`/api/projects/${projectId}/notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: name, texto: text, projectId }),
        });

        const note = await response.json();

        await db.notas.put(note);
    } catch (err) {
        const id = new ObjectId().toString();

        const note = {
            _id: id,
            nombre: name,
            texto: text,
            projectId,
        };

        await db.notas.put(note);

        await db.pendientes.put({
            note,
            tabla: "notas",
            tipo: "POST",
            ruta: `/api/projects/${projectId}/notes`,
        });
    }
};

const deleteNote = async (id) => {
    try {
        await fetch(`/api/notes/${id}`, {
            method: "DELETE",
        });

        await db.notas.delete(id);
    } catch (err) {
        await db.notas.delete(id);

        await db.pendientes.put({
            tabla: "notas",
            tipo: "DELETE",
            ruta: `/api/notes/${id}`,
        });
    }
};

export { getNotes, postNote, deleteNote };
