// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { z } = require("zod");
const User = require("../models/User.model.js");
const BlacklistToken = require("../models/blacklistToken.model.js");

const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

// POST register user route
// @route /api/auth/register
// @access Public
// @description Register user with username, email and password
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = registerSchema.parse(req.body);

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Registration failed",
    });
  }
};

const loginSchema = z
  .object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.username || data.email, {
    message: "Username or email is required",
    path: ["username"],
  });

// POST login user route
// @route /api/auth/login
// @access Public
// @description Login user with username or email and password
const loginUser = async (req, res) => {
  try {
    const { username, email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateAuthToken();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Login failed",
    });
  }
};

// GET logout user route
// @route /api/auth/logout
// @access Public
// @description Logout user
const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlacklistToken.create({ token });

    res.clearCookie("token");

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Logout failed",
    });
  }
};

// GET user profile route
// @route /api/auth/profile
// @access Private
// @description Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User profile retrieved successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to retrieve user profile",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getUserProfile };
