import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUsers,
  deleteUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyToken, getAllUsers);
router.get("/:id", getUserById);
router.post("/", verifyToken, createUser);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;
