import { db } from "../lib/index.js";
import { users } from "../db/userSchema.js";
import { firebaseAuth } from "../utils/firebaseAdmin.js";

// User registration
export const registerUser = async (req, res) => {
  const { email, firstName, lastName, profilePicture } = req.body;

  // Validate fields
  if (!email || !firstName || !lastName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log("Registering user:", { email, firstName, lastName });

  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where((user) => user.email === email)
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        first_name: firstName,
        last_name: lastName,
        profile_picture: profilePicture || null, // Optional
      })
      .returning(["id", "email", "first_name", "last_name", "profile_picture"]);

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { token: idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "ID Token is required" });
  }

  try {
    // Verify Firebase ID Token
    const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;
    console.log("Decoded Firebase UID:", firebaseUid);

    // Fetch user from database
    const [user] = await db
      .select()
      .from(users)
      .where("firebase_uid", firebaseUid);

    if (!user) {
      return res.status(404).json({ error: "User not found in the database" });
    }

    console.log("Fetched user:", user);

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Handle Firebase sign-in
export const handleFirebaseSignIn = async (req, res) => {
  const { uid, email, name, picture } = req.user;

  try {
    // Check if the user exists
    let user = await db
      .select()
      .from(users)
      .where(users.firebase_uid === uid)
      .limit(1);

    if (user.length === 0) {
      // Create a new user if not found
      user = await db.insert(users).values({
        firebase_uid: uid,
        email,
        display_name: name,
        profile_picture: picture,
        role: "attendee", // Default role
      });
    }

    res.status(200).json({ message: "User authenticated", user });
  } catch (error) {
    console.error("Error handling Firebase sign-in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db
      .select()
      .from(users)
      .where(users.id === Number(id));

    if (!user.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(token);
    const { uid: firebaseUid } = decodedToken;

    const [existingUser] = await db
      .select()
      .from(users)
      .where(users.firebase_uid === firebaseUid);

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const updates = {
      email: req.body.email || existingUser.email,
      first_name: req.body.firstName || existingUser.first_name,
      last_name: req.body.lastName || existingUser.last_name,
      display_name: req.body.displayName || existingUser.display_name,
      profile_picture: req.body.profilePicture || existingUser.profile_picture,
      role: req.body.role || existingUser.role,
    };

    const updatedUser = await db
      .update(users)
      .set(updates)
      .where(users.firebase_uid === firebaseUid);

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Soft delete user
export const deleteUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(token);
    const { uid: firebaseUid } = decodedToken;

    const [existingUser] = await db
      .select()
      .from(users)
      .where(users.firebase_uid === firebaseUid);

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Soft delete
    await db
      .update(users)
      .set({ isActive: false })
      .where(users.firebase_uid === firebaseUid);

    res
      .status(200)
      .json({ message: "User deleted successfully (soft delete)" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};
