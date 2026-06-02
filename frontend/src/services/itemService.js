import db from "../db";
import { ObjectId } from "bson";

const getItems = async (projectId) => {
    try {
        const response = await fetch(`/api/projects/${projectId}/items`);
        const items = await response.json();

        if (response.ok) {
            await db.items.bulkPut(items);
        }
    } catch (err) {
        console.log("Error al obtener items");
    }
};

const postItem = async (data) => {
    const { name, quantity, projectId } = data;

    try {
        const response = await fetch(`/api/projects/${projectId}/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: name, cantidad: quantity, projectId }),
        });

        const item = await response.json();

        await db.items.put(item);
    } catch (err) {
        const id = new ObjectId().toString();

        const item = {
            _id: id,
            nombre: name,
            cantidad: quantity,
            projectId,
        };

        await db.items.put(item);

        await db.pendientes.put({
            item,
            tabla: "items",
            tipo: "POST",
            ruta: `/api/projects/${projectId}/items`,
        });
    }
};

const deleteItem = async (id) => {
    try {
        await fetch(`/api/items/${id}`, {
            method: "DELETE",
        });

        await db.items.delete(id);
    } catch (err) {
        await db.items.delete(id);

        await db.pendientes.put({
            tabla: "items",
            tipo: "DELETE",
            ruta: `/api/items/${id}`,
        });
    }
};

export { getItems, postItem, deleteItem };
