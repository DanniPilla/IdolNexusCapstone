import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  getAllPublicUserInfo,
  getPersonalUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/public", getAllPublicUserInfo);
router.get("/", verifyToken, getPersonalUser);
router.get("/admin", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
