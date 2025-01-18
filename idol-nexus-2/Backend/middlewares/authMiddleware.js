import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorised: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Add user info to the request object
    next(); // Pass control to the next middleware
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
