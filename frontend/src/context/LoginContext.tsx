import { User } from "../types/loginType";
import { logoutUser } from "../services/auth/authService";
import { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface LoginProviderProps {
  children: ReactNode;
}

interface LoginContextProps {
  user: User | null;
  token: string | null;
  login: (userData: User, userToken: string) => void;
  logout: () => void;
}

export const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if (savedUser && savedUser !== "null" && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser));
      }

      if (savedToken && savedToken !== "null" && savedToken !== "undefined") {
        setToken(savedToken);
      }
    } catch (err) {
      console.error("Error loading user from localStorage in LoginContext:", err);
    }
  }, []);

  const login = (userData: User, userToken: string) => {
    if (userData && userToken) {
      setUser(userData);
      setToken(userToken);

      // Spara användare och token i localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userToken);
    } else {
      console.error("Invalid user data or token");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    logoutUser();
  };

  return (
    <LoginContext.Provider value={{ user, token, login, logout }}>{children}</LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

// Författare Sandra
