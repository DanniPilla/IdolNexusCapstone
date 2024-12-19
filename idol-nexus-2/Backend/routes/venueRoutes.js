import express from "express";
import {
  getAllVenues,
  getVenuesById,
  createVenues,
  updateVenues,
  deleteVenues,
} from "../controllers/venueController.js";

const router = express.Router();

router.get("/", getAllVenues);
router.get("/:id", getVenuesById);
router.post("/", createVenues);
router.put("/:id", updateVenues);
router.delete("/:id", deleteVenues);

export default router;
