// src/db.js
import Dexie from "dexie";

// 1. Instanciamos la base de datos con un nombre
export const db = new Dexie("InventarioDB");

// 2. Definimos las tablas y sus índices
db.version(1).stores({
    proyectos: "++id, nombre, sincronizado",
    notas: "++id, projectId, nombre, sincronizado",
    items: "++id, projectId, nombre, sincronizado",
});
