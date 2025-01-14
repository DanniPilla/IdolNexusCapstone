import express from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketsByUser,
} from "../controllers/ticketController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllTickets); // Protects route
router.get("/user", verifyToken, getTicketsByUser); // User-specific tickets
router.get("/:id", verifyToken, getTicketById);
router.post("/", verifyToken, createTicket);
router.put("/:id", verifyToken, updateTicket);
router.delete("/:id", verifyToken, deleteTicket);

export default router;
