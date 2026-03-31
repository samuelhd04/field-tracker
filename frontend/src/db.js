import Dexie from "dexie";

const db = new Dexie("MiBaseDeDatos");

db.version(2).stores({
    proyectos: "_id, nombre, sincronizado",
    notas: "_id, projectId, nombre, sincronizado",
    items: "_id, projectId, nombre, sincronizado",
    pendientes: "++id, tabla, tipo, sincronizado",
});

export default db;
