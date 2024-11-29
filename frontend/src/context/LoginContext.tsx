import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { User } from "../types/loginType";

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
  
      console.log("Saved user:", savedUser); // Debug-loggar
      console.log("Saved token:", savedToken);
  
      if (savedUser && savedUser !== "null" && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser)); // Parsar endast om det är en sträng
      }
  
      if (savedToken && savedToken !== "null" && savedToken !== "undefined") {
        setToken(savedToken); // Token är sannolikt en vanlig sträng
      }
    } catch (err) {
      console.error("Error in useEffect:", err);
    }
  }, []);
  

  const login = (userData: User, userToken: string) => {
    if (userData && userToken) {
      setUser(userData);
      setToken(userToken);
  
      // Spara användare och token i localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userToken);
  
      console.log("User logged in:", userData);
      console.log("Token:", userToken);
    } else {
      console.error("Invalid user data or token");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <LoginContext.Provider value={{ user, token, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the LoginContext
export const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

//FUNGERANDE KOD OVANFÖR

