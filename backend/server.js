require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongo = require("mongoose");

const projectRoutes = require("./routes/projectRoute");
const itemRoutes = require("./routes/itemRoute");
const noteRoutes = require("./routes/noteRoute");

const app = express();

app.use(cors());
app.use(express.json());

mongo
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
});

app.use(projectRoutes);
app.use(itemRoutes);
app.use(noteRoutes);
