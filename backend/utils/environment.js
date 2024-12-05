import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET;

export const generateJWT = (user) => {
  return jwt.sign(user, jwtSecret, { expiresIn: "1h" });
};

// Författare: SANDRA
