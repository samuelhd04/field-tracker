const express = require("express");
const app = express();
const mongo = require("mongoose");
require("dotenv").config();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

app.use(express.json());

mongo
    .connect(
        `mongodb+srv://${dbUser}:${dbPass}@cluster0.pnqxfuz.mongodb.net/?appName=Cluster0`,
    )
    .then(() => {
        console.log("suuuuuu");
    })
    .catch((err) => {
        console.log(err);
    });

const itemSchema = new mongo.Schema({
    nombre: String,
    cantidad: Number,
});

const Item = mongo.model("Item", itemSchema);

app.post("/nuevo-item", async (req, res) => {
    try {
        const nuevoItem = new Item(req.body);
        await nuevoItem.save();
        res.send("Item guardado con éxito");
    } catch (error) {
        res.status(500).send("Error al guardar");
    }
});

app.get("/", (req, res) => {
    res.sendFile("views/home.html", { root: __dirname });
});

app.get("/inventario", (req, res) => {
    res.sendFile("views/inventario.html", { root: __dirname });
});

app.get("/notas", (req, res) => {
    res.sendFile("views/notas.html", { root: __dirname });
});

app.get("/get-items", async (req, res) => {
    const resultados = await Item.find();
    res.json(resultados);
});

app.delete("/borrar-item", async (req, res) => {
    await Item.deleteOne({ nombre: req.body.mensaje });
});

app.listen(3000, () => {
    console.log("Listening!");
});
