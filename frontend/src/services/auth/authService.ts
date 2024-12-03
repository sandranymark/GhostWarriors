import axios from "axios";
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
    console.log("Login response:", response.data);
    return response.data.data; // Returnerar användare och token från servern
  } catch (error) {
    // Kollar om vi får ett specifikt felmeddelande från servern eller Axios
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw new Error("An error occurred while logging in");
  }
};

// Logga ut
export const logoutUser = (): void => {
  // Rensar eventuell token eller användardata
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const RegisterUser = async (credentials: LoginCredentials): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(`${API_URL}/register`, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    }
    throw new Error("An error occurred while registering");
  }
};
