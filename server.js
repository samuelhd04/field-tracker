require("dotenv").config();

const express = require("express");
const mongo = require("mongoose");
const Item = require("./models/Item");
const itemControls = require("./controllers/itemController");

const app = express();

app.use(express.json());

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

app.get("/", itemControls.getHome);
app.get("/inventario", itemControls.getInventario);
app.get("/notas", itemControls.getNotas);
app.get("/getItems", itemControls.getItems);

app.post("/nuevoItem", itemControls.postItem);

app.delete("/borrarItem", itemControls.deleteItem);
