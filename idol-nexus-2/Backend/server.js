import express from "express";
import cors from "cors";
import "dotenv/config";

import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import organiserRoutes from "./routes/organiserRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/organisers", organiserRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/calendars", calendarRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Idol Nexus API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Database URL:", process.env.DATABASE_URL);
});
