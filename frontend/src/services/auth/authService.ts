import axios from "axios";
import { RegisterType } from "../../types/registerType";
import { registerSchema } from "../../models/registerSchema";
import { LoginCredentials, RegisterResponse, LoginResponse } from "../../types/loginType";

// API Base URL för autentisering
const API_URL = "https://i0hwwn0u7f.execute-api.eu-north-1.amazonaws.com/users";

// POST: Logga in användare
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<{ success: boolean; data: LoginResponse }>(
      `${API_URL}/login`,
      credentials,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("An error occurred while logging in");
  }
};

// Logga ut
export const logoutUser = (): void => {
  // Rensar token och användardata
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const RegisterUser = async (credentials: RegisterType): Promise<RegisterResponse> => {
  // Validera med Joi
  const { error } = registerSchema.validate(credentials, { abortEarly: false });
  if (error) {
    // Slå samman alla felmeddelanden
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }

  try {
    // Skicka endast `username`, `email`, och `password` till servern
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/register`,
      {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    }
    throw new Error("An error occurred while registering");
  }
};

// Författare Adréan
