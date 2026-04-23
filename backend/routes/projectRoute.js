const express = require("express");

const projectControls = require("../controllers/projectController");

const router = express.Router();

router.get("/api/projects", projectControls.getProjects);
router.post("/api/projects", projectControls.postProject);
router.delete("/api/projects/:id", projectControls.deleteProject);

module.exports = router;
