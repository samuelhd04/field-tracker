const express = require("express");

const noteControls = require("../controllers/noteController");

const router = express.Router();

router.get("/api/projects/:id/notes", noteControls.getNotes);
router.post("/api/projects/:id/notes", noteControls.postNote);
router.delete("/api/notes/:id", noteControls.deleteNote);

module.exports = router;
