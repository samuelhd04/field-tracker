require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongo = require("mongoose");

const projectRoutes = require("./routes/projectRoutes");
const itemRoutes = require("./routes/itemRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

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

app.use(projectRoutes);
app.use(itemRoutes);
app.use(noteRoutes);
