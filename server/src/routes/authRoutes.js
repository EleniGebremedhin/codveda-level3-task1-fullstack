const express = require("express");
const router = express.Router();
const authorizeRoles = require("../middleware/roleMiddleware");
const User = require("../models/User");

const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser } = require("../controllers/authController");

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// GET /api/auth/me
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});
// GET /api/auth/admin - Admin-only test route
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome, Admin! You have access.",
    user: req.user.name,
    role: req.user.role,
  });
});
router.get("/users", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
