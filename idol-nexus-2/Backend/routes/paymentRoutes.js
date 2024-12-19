import express from "express";
import {
  getAllPayments,
  getPaymentsById,
  createPayments,
  updatePayments,
  deletePayments,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/", getAllPayments);
router.get("/:id", getPaymentsById);
router.post("/", createPayments);
router.put("/:id", updatePayments);
router.delete("/:id", deletePayments);

export default router;
