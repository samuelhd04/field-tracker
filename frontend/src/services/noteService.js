import db from "../db";
import { ObjectId } from "bson";
import API_URL from "../config";

const getNotes = async (projectId) => {
    try {
        const response = await fetch(`${API_URL}/api/projects/${projectId}/notes`);
        const notes = await response.json();

        if (response.ok) {
            await db.notas.bulkPut(notes);

            const pendingNotes = await db.pendientes
                .where("tabla")
                .equals("notas")
                .and((task) => task.tipo === "POST")
                .toArray();

            const pendingIds = pendingNotes.map((task) => task.note._id);
            const serverIds = notes.map((note) => note._id);
            const allIds = [...new Set([...pendingIds, ...serverIds])];

            await db.notas.where("_id").noneOf(allIds).delete();
        }
    } catch (err) {
        console.log("Error al obtener notas");
    }
};

const postNote = async (data) => {
    const { name, text, projectId } = data;

    try {
        const response = await fetch(`${API_URL}/api/projects/${projectId}/notes`, {
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
        await fetch(`${API_URL}/api/notes/${id}`, {
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
