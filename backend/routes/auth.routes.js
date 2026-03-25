const express = require("express");
const { authMiddleware } = require("../middleware/user.middleware");
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/auth.controller");
const router = express.Router();

// POST user register route
router.post("/register", registerUser);

// POST user login route
router.post("/login", loginUser);

// GET user profile route
router.get("/me", authMiddleware, getUserProfile);

// GET user logout route
router.get("/logout", logoutUser);




module.exports = router;
