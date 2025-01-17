// import { db } from "../lib/index.js";
// import { users } from "../db/userSchema.js";
// import { eq } from "drizzle-orm";
// import bcrypt from "bcrypt";

// export const registerUser = async (req, res) => {
//   console.log("Starting registration process"); // Debug log

//   const { email, password, firstName, lastName } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required" });
//   }

//   try {
//     console.log("Checking for existing user"); // Debug log

//     // Simplified query
//     const existingUser = await db
//       .select({ id: users.id })
//       .from(users)
//       .where(eq(users.email, email))
//       .limit(1);

//     console.log("Existing user query completed:", existingUser); // Debug log

//     if (existingUser.length > 0) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     console.log("Inserting new user"); // Debug log

//     const [newUser] = await db
//       .insert(users)
//       .values({
//         email,
//         password: hashedPassword,
//         firstName,
//         lastName,
//         isActive: true,
//       })
//       .returning({
//         id: users.id,
//         email: users.email,
//       });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

import { db } from "../lib/index.js";
import { users } from "../db/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
// User registration
export const registerUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    profilePicture,
    displayName,
    role,
    organisationName,
    bio,
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null,
        isActive: true,
        phoneNumber: phoneNumber,
        profilePicture: profilePicture || null,
        displayName: displayName,
        role: role || undefined,
        organisationName: organisationName || null,
        bio: bio || null,
      })
      .returning({ id: users.id, email: users.email });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPersonalUser = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID from token:", userId);

    const personalUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    console.log("Personal User:", personalUser);

    if (!personalUser.length) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(personalUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get public user info
export const getAllPublicUserInfo = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 users per page
  const offset = (page - 1) * limit;
  try {
    // Select only public fields
    const publicFields = ["id", "name", "profile_[icture", "bio"];
    const allUsers = await db
      .select(...publicFields)
      .from(users)
      .limit(limit)
      .offset(offset);

    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, firstName, lastName, password } = req.body;

  try {
    const [user] = await db.select().from(users).where("id", id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updates = {
      email: email || user.email,
      first_name: firstName || user.first_name,
      last_name: lastName || user.last_name,
      password: password ? await bcrypt.hash(password, 10) : user.password,
    };

    const [updatedUser] = await db
      .update(users)
      .set(updates)
      .where("id", id)
      .returning(["id", "email", "first_name", "last_name"]);

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Soft delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await db.select().from(users).where("id", id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await db.update(users).set({ isActive: false }).where("id", id);

    res
      .status(200)
      .json({ message: "User deleted successfully (soft delete)" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
