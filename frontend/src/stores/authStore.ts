import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: { username: string; role: string } | null;
  isLoading: boolean; // Nytt tillstånd för att spåra laddning
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: { username: string; role: string } | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoading: true, // Börja som laddande
  setIsLoggedIn: (loggedIn) => {
    set({ isLoggedIn: loggedIn });
    if (!loggedIn) {
      localStorage.removeItem("token");
    }
  },
  setUser: (user) => {
    set({ user, isLoading: false }); // Stäng av laddning när användaren är satt
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  },
  setLoading: (loading) => set({ isLoading: loading }), // Manuell laddningskontroll
  logout: () =>
    set(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { isLoggedIn: false, user: null, isLoading: false };
    }),
}));

export default useAuthStore;
