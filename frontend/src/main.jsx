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
    const pendientes = await db.pendientes.toArray();

    pendientes.forEach(pendiente => {
        await fetch()
    })

    console.log(await db.pendientes.toArray());
});
