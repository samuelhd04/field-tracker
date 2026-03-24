const mongo = require("mongoose");

const itemSchema = new mongo.Schema({
    nombre: String,
    cantidad: Number,
    projectId: {
        type: mongo.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
});

const Item = mongo.model("Item", itemSchema);

module.exports = Item;
