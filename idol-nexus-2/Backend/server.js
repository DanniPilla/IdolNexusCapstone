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
import calendarRoutes from "./routes/calendarRoutes.js";
import { verifyToken } from "./middlewares/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Idol Nexus API!");
});

// Test Firebase connection
app.get("/api/test-firebase", async (req, res) => {
  try {
    const listUsers = await admin.auth().listUsers(1);
    res.json({ message: "Firebase connection successful", users: listUsers });
  } catch (error) {
    console.error("Firebase test error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Protected route example
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "If you see this, Firebase Auth is working",
    user: req.user,
  });
});

// User login
app.post("/api/auth/login", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "ID Token is required" });
  }

  try {
    // Verify the ID token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    // Query your database for the user
    const user = await db
      .select()
      .from(users)
      .where({ firebase_uid: firebaseUid })
      .first();

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found in the database" });
    }

    // Generate a session token (JWT) or return user data
    const sessionToken = generateSessionToken(user); // Implement your token generator
    res.json({ sessionToken, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
});

// Test login functionality
app.post("/api/test-login", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Get the user
    const user = await admin.auth().getUserByEmail(email);
    console.log("User found:", user.uid);

    // Create a custom token
    const customToken = await admin.auth().createCustomToken(user.uid);

    // Exchange custom token for ID token using Firebase Auth REST API
    const response = await fetch(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: customToken, returnSecureToken: true }),
      }
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    res.json({
      message: "Test token generated",
      idToken: data.idToken,
    });
  } catch (error) {
    console.error("Token generation error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

app.use("/api/calendars", calendarRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Database URL:", process.env.DATABASE_URL);
});
// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import admin from "./utils/firebaseAdmin.js";
// import fetch from "node-fetch";

// import eventRoutes from "./routes/eventRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import ticketRoutes from "./routes/ticketRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import venueRoutes from "./routes/venueRoutes.js";
// import calendarRoutes from "./routes/calendarRoutes.js";
// import { verifyToken } from "./middlewares/authMiddleware.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// });

// // Root Endpoint
// app.get("/", (req, res) => {
//   res.send("Welcome to the Idol Nexus API!");
// });

// // Test Firebase connection
// app.get("/api/test-firebase", async (req, res) => {
//   try {
//     const listUsers = await admin.auth().listUsers(1);
//     res.json({ message: "Firebase connection successful", users: listUsers });
//   } catch (error) {
//     console.error("Firebase test error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Protected route example
// app.get("/api/protected", verifyToken, (req, res) => {
//   res.json({
//     message: "If you see this, Firebase Auth is working",
//     user: req.user,
//   });
// });

// // User login
// app.post("/api/auth/login", async (req, res) => {
//   const { idToken } = req.body;

//   if (!idToken) {
//     return res.status(400).json({ message: "ID Token is required" });
//   }

//   try {
//     // Verify the ID token with Firebase Admin SDK
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const firebaseUid = decodedToken.uid;

//     // Query your database for the user
//     const user = await db
//       .select()
//       .from(users)
//       .where({ firebase_uid: firebaseUid })
//       .first();

//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found in the database" });
//     }

//     // Generate a session token (JWT) or return user data
//     const sessionToken = generateSessionToken(user); // Implement your token generator
//     res.json({ sessionToken, user });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// });

// // Test login functionality
// app.post("/api/test-login", async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     // Get the user
//     const user = await admin.auth().getUserByEmail(email);
//     console.log("User found:", user.uid);

//     // Create a custom token
//     const customToken = await admin.auth().createCustomToken(user.uid);

//     // Exchange custom token for ID token using Firebase Auth REST API
//     const response = await fetch(
//       `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: customToken, returnSecureToken: true }),
//       }
//     );

//     const data = await response.json();

//     if (data.error) {
//       throw new Error(data.error.message);
//     }

//     res.json({
//       message: "Test token generated",
//       idToken: data.idToken,
//     });
//   } catch (error) {
//     console.error("Token generation error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Routes
// app.use("/api/events", eventRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/tickets", ticketRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/venues", venueRoutes);
// app.use("/api/calendars", calendarRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
//   console.log("Database URL:", process.env.DATABASE_URL);
// });
