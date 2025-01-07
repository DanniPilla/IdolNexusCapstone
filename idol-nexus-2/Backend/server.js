import express from "express";
import cors from "cors";
import "dotenv/config";
import admin from "./utils/firebaseAdmin.js";
import fetch from "node-fetch";

import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import venueRoutes from "./routes/venueRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import { verifyToken } from "./middlewares/authMiddleware.js";

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
app.use("/api/venues", venueRoutes);
app.use("/api/calendars", calendarRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Idol Nexus API!");
});

app.get("/api/test-firebase", async (req, res) => {
  try {
    const listUsers = await admin.auth().listUsers(1);
    res.json({ message: "Firebase connection successful", users: listUsers });
  } catch (error) {
    console.error("Firebase test error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "If you see this, Firebase Auth is working",
    user: req.user,
  });
});

app.post("/api/test-login", async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Email received:", email);

    // Get the user
    const user = await admin.auth().getUserByEmail(email);
    console.log("User found:", user.uid);

    // Create a custom token
    const customToken = await admin.auth().createCustomToken(user.uid);
    console.log("Custom token created:", customToken);

    // Exchange custom token for ID token using Firebase Auth REST API
    const response = await fetch(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: customToken,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();
    console.log("Firebase response data:", data);

    // Check if we got an error from Firebase
    if (data.error) {
      throw new Error(data.error.message);
    }

    res.json({
      message: "Test token generated",
      idToken: data.idToken,
      customToken, // Including this for debugging
    });
  } catch (error) {
    console.error("Token generation error:", error);
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Database URL:", process.env.DATABASE_URL);
});
