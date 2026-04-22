const express = require("express");
const noteControls = require("../controllers/noteController");

const router = express.Router();

router.get("/api/projects/:id/notes", noteControls.getTextos);
router.post("/api/projects/:id/notes", noteControls.postNota);
router.delete("/api/notes/:id", noteControls.deleteNota);

module.exports = router;
