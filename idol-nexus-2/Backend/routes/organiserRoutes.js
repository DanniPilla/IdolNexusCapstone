import express from "express";
import {
  getAllOrganisers,
  getOrganiserById,
  createOrganiser,
  updateOrganiser,
  deleteOrganiser,
} from "../controllers/organiserController.js";

const router = express.Router();

router.get("/", getAllOrganisers);
router.get("/:id", getOrganiserById);
router.post("/", createOrganiser);
router.put("/:id", updateOrganiser);
router.delete("/:id", deleteOrganiser);

export default router;
