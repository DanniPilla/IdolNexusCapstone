import bcrypt from 'bcrypt';

const saltRounds = 10;

// Hash a plain password
export const hashPassword = async (password) => {
  return bcrypt.hash(password, saltRounds);
};

// Verify a plain password against a hashed password
export const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};