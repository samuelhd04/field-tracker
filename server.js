const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req, res) => {
    res.sendFile("views/home.html", { root: __dirname });
});

app.get("/inventario", (req, res) => {
    res.sendFile("views/inventario.html", { root: __dirname });
});

app.get("/notas", (req, res) => {
    res.sendFile("views/notas.html", { root: __dirname });
});

app.listen(3000, () => {
    console.log("Listening!");
});
