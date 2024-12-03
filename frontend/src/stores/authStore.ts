import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: { username: string; role: string } | null;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: { username: string; role: string } | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem("token"), // Kontrollera om token finns
  user: JSON.parse(localStorage.getItem("user") || "null"), // Läs användarinfo från localStorage
  setIsLoggedIn: (loggedIn) => {
    set({ isLoggedIn: loggedIn });
    if (!loggedIn) {
      localStorage.removeItem("token"); // Ta bort token vid utloggning
    }
  },
  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Spara användarinfo
    } else {
      localStorage.removeItem("user"); // Ta bort användarinfo
    }
  },
  logout: () =>
    set(() => {
      localStorage.removeItem("token"); // Ta bort token
      localStorage.removeItem("user"); // Ta bort användarinfo
      return { isLoggedIn: false, user: null };
    }),
}));

export default useAuthStore;
