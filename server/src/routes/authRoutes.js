const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);
console.log("Router inside authRoutes:", typeof router);

module.exports = router;
