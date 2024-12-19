import { db } from "../lib/index.js";
import { users } from "../db/userSchema.js";
import { firebaseAuth } from "../utils/firebaseAdmin.js";

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

    const decodedToken = await firebaseAuth.verifyIdToken(token);

    const {
      uid: firebaseUid,
      email,
      name: displayName,
      picture: profilePicture,
    } = decodedToken;

    const existingUser = await db
      .select()
      .from(users)
      .where(users.firebaseUid.equals(firebaseUid));

    if (existingUser.length > 0) {
      return res
        .status(200)
        .json({ message: "User already exists", user: existingUser[0] });
    }

    const newUser = await db.insert(users).values({
      firebaseUid,
      email,
      displayName: displayName || null,
      profilePicture: profilePicture || null,
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
      .where(users.firebaseUid.equals(firebaseUid));

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
