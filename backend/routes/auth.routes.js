const express = require("express");
const { authMiddleware } = require("../middleware/user.middleware");
const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/auth.controller");
const router = express.Router();

// POST user register route
router.post("/register", registerUser);

// POST user login route
router.post("/login", loginUser);

// GET user profile route
router.get("/me", authMiddleware, (req, res) => {
  res.send("Hii its user route ");
});

// POST user logout route
router.post("/logout", authMiddleware, logoutUser);
module.exports = router;
