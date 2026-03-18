//env variables
require("dotenv").config();

// imports
const express = require("express");
const mongo = require("mongoose");
const Item = require("./models/Item");
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
app.get("/", itemControls.getHome);
app.get("/inventario", itemControls.getInventario);
app.get("/notas", itemControls.getNotas);
app.get("/getItems", itemControls.getItems);
app.get("/getNotas", noteControls.getTextos);

app.post("/nuevoItem", itemControls.postItem);
app.post("/nuevaNota", noteControls.postNota);

app.delete("/borrarItem", itemControls.deleteItem);
app.delete("/borrarNota", noteControls.deleteNota);
