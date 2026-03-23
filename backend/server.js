//env variables
require("dotenv").config();

// imports
const express = require("express");
const mongo = require("mongoose");
const itemControls = require("./controllers/itemController");
const noteControls = require("./controllers/noteController");

// express app
const app = express();

// middleware
app.use(express.json());

// db connection
mongo
    .connect(process.env.DB_URL)
    .then(() => {
        app.listen(3000, () => {
            console.log("Listening!");
        });
    })
    .catch((err) => {
        console.log(err);
    });

// routes
app.get("/api/getItems", itemControls.getItems);
app.get("/api/getNotas", noteControls.getTextos);

app.post("/api/nuevoItem", itemControls.postItem);
app.post("/api/nuevaNota", noteControls.postNota);

app.delete("/api/borrarItem/:id", itemControls.deleteItem);
app.delete("/api/borrarNota/:id", noteControls.deleteNota);
