import { db } from "../db/index.js";
import { organiserProfiles } from "../db/organiserSchema.js";

export const getAllOrganisers = async (req, res) => {
  try {
    const organisers = await db.select().from(organiserProfiles);
    res.json(organisers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching organisers", error });
  }
};
