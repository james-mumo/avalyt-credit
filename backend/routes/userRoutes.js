// routes/userRoutes.js
import express from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

// Route to create a new user
router.post("/users", createUser);

// Route to login a user
router.post("/login", loginUser);

// Route to get all users
router.get("/users", getAllUsers);

export default router;
