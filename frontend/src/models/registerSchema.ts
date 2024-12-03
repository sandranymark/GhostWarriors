import Joi from "joi";
import { RegisterType } from "../types/registerType"; // Justera importvägen efter behov

// Definiera Joi-schema för användarregistrering
export const registerSchema = Joi.object<RegisterType>({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "nu", "se"] } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must be at most 30 characters long.",
    "any.required": "Username is required.",
  }),
  password: Joi.string().min(8).max(30).required().messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password must be at most 30 characters long.",
    "any.required": "Password is required.",
  }),
  // confirmPassword: Joi.string()
  // .required()
  // .valid(Joi.ref("password"))
  // .messages({
  //   "any.only": "Passwords must match.",
  //   "any.required": "Confirm Password is required.",
  // }),
});

// Författare Sandra
