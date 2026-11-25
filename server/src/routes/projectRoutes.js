const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// All routes require login
router.use(protect);

// Admin only: create project
router.post("/", authorizeRoles("admin"), createProject);

// Logged-in users: view projects
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin only: update and delete
router.put("/:id", authorizeRoles("admin"), updateProject);
router.delete("/:id", authorizeRoles("admin"), deleteProject);

module.exports = router;
