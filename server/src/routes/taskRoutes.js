const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

router.use(protect);

// Admin creates tasks
router.post("/", authorizeRoles("admin"), createTask);

// Admin and members view permitted tasks
router.get("/", getTasks);
router.get("/:id", getTaskById);

// Admin updates or deletes tasks
router.put("/:id", authorizeRoles("admin"), updateTask);
router.delete("/:id", authorizeRoles("admin"), deleteTask);

// Members update their own task status
router.patch("/:id/status", updateTaskStatus);

module.exports = router;
