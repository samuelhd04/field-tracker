import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import db from "./db";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}

window.addEventListener("offline", () => {
    console.log("You are now offline");
});

window.addEventListener("online", async () => {
    const pendingTasks = await db.pendientes.toArray();

    for (const task of pendingTasks) {
        if (task.tipo === "POST") {
            if (task.tabla === "proyectos") {
                try {
                    const response = await fetch(task.ruta, {
                        method: task.tipo,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(task.proyecto),
                    });

                    if (response.ok) {
                        await db.pendientes.delete(task.id);
                        await db.proyectos.put(await response.json());
                    }
                } catch (err) {
                    console.log("Error al sincronizar");
                }
            }
        }
    }
});
