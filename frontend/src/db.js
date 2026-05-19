import Dexie from "dexie";

const db = new Dexie("MiBaseDeDatos");

db.version(3).stores({
    proyectos: "_id, nombre",
    notas: "_id, projectId, nombre",
    items: "_id, projectId, nombre",
    pendientes: "++id, tabla, tipo",
});

export default db;
