import Joi from "joi";
import { LoginCredentials } from "../types/loginType";

export const loginSchema = Joi.object<LoginCredentials>({
  username: Joi.string().min(3).max(30).required().messages({
    "any.required": "Username is required.",
  }),
  password: Joi.string().max(30).required().messages({
    "any.required": "Password is required.",
  }),
});

// Författare Sandra
