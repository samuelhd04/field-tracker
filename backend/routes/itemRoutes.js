const express = require("express");
const itemControls = require("../controllers/itemController");

const router = express.Router();

router.get("/api/projects/:id/items", itemControls.getItems);
router.post("/api/projects/:id/items", itemControls.postItem);
router.delete("/api/items/:id", itemControls.deleteItem);

module.exports = router;
