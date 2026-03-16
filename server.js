//env variables
require("dotenv").config();

// imports
const express = require("express");
const mongo = require("mongoose");
const Item = require("./models/Item");
const itemControls = require("./controllers/itemController");

// express app
const app = express();

// middleware
app.use(express.json());

// db connection
mongo
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pnqxfuz.mongodb.net/?appName=Cluster0`,
    )
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
app.get("/getNotas", itemControls.getTextos);

app.post("/nuevoItem", itemControls.postItem);
app.post("/nuevaNota", itemControls.postNota);

app.delete("/borrarItem", itemControls.deleteItem);
app.delete("/borrarNota", itemControls.deleteNota);
