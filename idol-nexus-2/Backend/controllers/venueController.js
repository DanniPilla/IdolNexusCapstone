import { db } from "../lib/index.js";
import { config } from "dotenv";
config({ path: "./Backend/.env" });
import { venues } from "../db/venueSchema.js";

export const getAllVenues = async (req, res) => {
  try {
    const results = await db.select().from(venues);
    console.log("Venues fetched successfully:", results);
    res.json(results);
  } catch (error) {
    console.error("Error fetching venues:", error);
    res
      .status(500)
      .json({ message: "Error fetching venues", error: error.message });
  }
};
// export const getAllVenues = async (req, res) => {
//   try {
//     // Debugging: Log the query being generated
//     const query = db.select().from(venues);
//     console.log("Query:", query.toSQL()); // Log the SQL query for debugging

//     // Execute the query
//     const venuesList = await query;

//     // Send the response
//     res.json(venuesList);
//   } catch (error) {
//     console.error("Error fetching venues:", error);
//     res.status(500).json({
//       message: "Error fetching venues",
//       error: error.message || error,
//     });
//   }
// };

export const createVenue = async (req, res) => {
  const { name, address, city, state, country, postalCode, capacity } =
    req.body;

  try {
    await db.insert(venues).values({
      name,
      address,
      city,
      state: state || null,
      country,
      postal_code: postalCode || null,
      capacity: capacity || 0,
    });

    res.status(201).json({ message: "Venue created successfully." });
  } catch (error) {
    console.error("Error creating venue:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getVenueById = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await db
      .select()
      .from(venues)
      .where(venues.id.equals(Number(id)))
      .limit(1);

    if (venue.length === 0) {
      return res.status(404).json({ message: "Venue not found." });
    }

    res.json(venue[0]);
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getVenuesByCity = async (req, res) => {
  const { city } = req.query;
  try {
    const venuesInCity = await db
      .select()
      .from(venues)
      .where(venues.city.equals(city));

    res.json(venuesInCity);
  } catch (error) {
    console.error("Error fetching venues by city:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateVenue = async (req, res) => {
  const { id } = req.params;
  const { name, address, city, state, country, postalCode, capacity } =
    req.body;

  try {
    const updatedVenue = await db
      .update(venues)
      .set({
        name: name || undefined,
        address: address || undefined,
        city: city || undefined,
        state: state || undefined,
        country: country || undefined,
        postal_code: postalCode || undefined,
        capacity: capacity || undefined,
      })
      .where(venues.id.equals(Number(id)));

    if (updatedVenue.rowCount === 0) {
      return res.status(404).json({ message: "Venue not found." });
    }

    res.json({ message: "Venue updated successfully." });
  } catch (error) {
    console.error("Error updating venue:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteVenue = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVenue = await db
      .delete()
      .from(venues)
      .where(venues.id.equals(Number(id)));

    if (deletedVenue.rowCount === 0) {
      return res.status(404).json({ message: "Venue not found." });
    }

    res.json({ message: "Venue deleted successfully." });
  } catch (error) {
    console.error("Error deleting venue:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getVenuesByCapacity = async (req, res) => {
  const { minCapacity } = req.query;
  try {
    const venuesByCapacity = await db
      .select()
      .from(venues)
      .where(venues.capacity.gte(Number(minCapacity)));

    res.json(venuesByCapacity);
  } catch (error) {
    console.error("Error fetching venues by capacity:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
