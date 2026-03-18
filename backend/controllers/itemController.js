const Item = require("../models/Item");

const getItems = async (req, res) => {
    const resultados = await Item.find();
    res.json(resultados);
};

const postItem = async (req, res) => {
    try {
        const nuevoItem = new Item(req.body);
        await nuevoItem.save();
        res.send("Item guardado con éxito");
    } catch (error) {
        res.status(500).send("Error al guardar");
    }
};

const deleteItem = async (req, res) => {
    await Item.deleteOne({ nombre: req.body.mensaje });
    res.send("Borrado!");
};

module.exports = {
    getItems,
    postItem,
    deleteItem,
};
