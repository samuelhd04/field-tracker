//env variables
require("dotenv").config();

// imports
const express = require("express");
const cors = require("cors");
const mongo = require("mongoose");
const itemControls = require("./controllers/itemController");
const noteControls = require("./controllers/noteController");
const projectControls = require("./controllers/projectController");

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// db connection
mongo
    .connect(process.env.DB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Listening!");
        });
    })
    .catch((err) => {
        console.log(err);
    });

// routes
app.get("/api/getProyectos", projectControls.getProjects);
app.get("/api/getItems/proyecto/:id", itemControls.getItems);
app.get("/api/getNotas/proyecto/:id", noteControls.getTextos);

app.post("/api/nuevoProyecto", projectControls.postProject);
app.post("/api/nuevoItem/proyecto/:id", itemControls.postItem);
app.post("/api/nuevaNota/proyecto/:id", noteControls.postNota);

app.delete("/api/borrarProyecto/:id", projectControls.deleteProject);
app.delete("/api/borrarItem/:id", itemControls.deleteItem);
app.delete("/api/borrarNota/:id", noteControls.deleteNota);
