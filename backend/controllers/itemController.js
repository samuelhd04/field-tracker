const Item = require("../models/Item");

const getItems = async (req, res) => {
    try {
        const items = await Item.find({ projectId: req.params.id });
        res.json(items);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener items del proyecto");
    }
};

const postItem = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send("Item guardado!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al guardar item");
    }
};

const deleteItem = async (req, res) => {
    try {
        await Item.deleteOne({ _id: req.params.id });
        res.send("Item borrado!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al borrar item");
    }
};

module.exports = {
    getItems,
    postItem,
    deleteItem,
};
