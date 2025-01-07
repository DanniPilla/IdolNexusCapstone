import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  handleFirebaseSignIn,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", verifyToken, getAllUsers);
router.get("/:id", getUserById);
router.post("/", verifyToken, createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/firebase-login", verifyToken, handleFirebaseSignIn);

export default router;
