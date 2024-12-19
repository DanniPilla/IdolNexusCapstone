import express from "express";
import {
  getAllOrders,
  getOrdersById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrdersById);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
