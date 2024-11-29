export interface User {
  userId: string;
  username: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ProtectedResourceResponse {
  protectedData: string; // Exempel på vad som returneras
  user: User; // Om användarinformation inkluderas
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: User;
}