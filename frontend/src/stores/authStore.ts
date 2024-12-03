import { create } from "zustand";

type User = {
  username: string;
  role: "admin" | "user";
};

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem("token"),
  user: (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  })(),
  isLoading: !(localStorage.getItem("token") && localStorage.getItem("user")),
  setIsLoggedIn: (loggedIn) => {
    set({ isLoggedIn: loggedIn });
    if (!loggedIn) {
      localStorage.removeItem("token");
    }
  },
  setUser: (user) => {
    try {
      set({ user, isLoading: false });
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Failed to update user in localStorage:", error);
    }
  },
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () =>
    set(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { isLoggedIn: false, user: null, isLoading: false };
    }),
}));

export default useAuthStore;

// Författare Adréan
