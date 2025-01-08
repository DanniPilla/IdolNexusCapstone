import { db } from "../lib/index.js";
import { users } from "../db/userSchema.js";
import { firebaseAuth } from "../utils/firebaseAdmin.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

// User registration
export const registerUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(users.email.equals(email))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
      })
      .returning(["id", "email", "first_name", "last_name"]);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// User login/
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user
    const user = await db
      .select()
      .from(users)
      .where(users.email.equals(email))
      .limit(1);

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the password
    const passwordMatch = await verifyPassword(password, user[0].password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user: user[0] });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleFirebaseSignIn = async (req, res) => {
  const { uid, email, name, picture } = req.user; // Extracted from decoded token

  try {
    // Check if the user exists
    let user = await db
      .select()
      .from(users)
      .where(users.firebase_uid.equals(uid))
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

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db
      .select()
      .from(users)
      .where(users.id.equals(Number(id)));
    if (!user.length) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify token and decode it
    const decodedToken = await firebaseAuth.verifyIdToken(token);
    const {
      uid: firebaseUid,
      email,
      name: displayName,
      picture: profilePicture,
    } = decodedToken;

    if (!email || !firebaseUid) {
      return res
        .status(400)
        .json({ message: "Invalid token: Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(users.firebase_uid.equals(firebaseUid))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(200).json({
        message: "User already exists",
        user: existingUser[0],
      });
    }

    // Insert new user
    const newUser = await db.insert(users).values({
      firebase_uid: firebaseUid,
      email,
      display_name: displayName || null,
      profile_picture: profilePicture || null,
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decodedToken = await firebaseAuth.verifyIdToken(token);

    const { uid: firebaseUid } = decodedToken;

    const existingUser = await db
      .select()
      .from(users)
      .where(users.firebaseUid.equals(firebaseUid));

    if (existingUser.length === 0) {
      return res.status(200).json({ message: "User does not exist" });
    }

    const { email, firstName, lastName, displayName, profilePicture, role } =
      req.body;

    const updatedUser = await db
      .update(users)
      .set({
        email: email || existingUser[0].email,
        firstName: firstName || existingUser[0].firstName,
        lastName: lastName || existingUser[0].lastName,
        displayName: displayName || existingUser[0].displayName,
        profilePicture: profilePicture || existingUser[0].profilePicture,
        role: role || existingUser[0].role,
      })
      .where(users.firebaseUid.equals(firebaseUid));

    res.status(201).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decodedToken = await firebaseAuth.verifyIdToken(token);

    const { uid: firebaseUid } = decodedToken;

    const existingUser = await db
      .select()
      .from(users)
      .where(users.firebase_uid === firebaseUid);

    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Soft delete
    await db
      .update(users)
      .set({ isActive: false })
      .where(users.firebaseUid.equals(firebaseUid));

    res
      .status(200)
      .json({ message: "User deleted successfully (soft delete)" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};
