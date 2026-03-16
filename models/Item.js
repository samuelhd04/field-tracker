const mongo = require("mongoose");

const itemSchema = new mongo.Schema({
    nombre: String,
    cantidad: Number,
});

const Item = mongo.model("Item", itemSchema);

module.exports = Item;
