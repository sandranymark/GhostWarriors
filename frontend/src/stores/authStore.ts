import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: { username: string; role: string } | null; // Du kan justera typen baserat på din användardata
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: { username: string; role: string } | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setUser: (user) => set({ user }),
  logout: () =>
    set(() => {
      localStorage.removeItem("token");
      return { isLoggedIn: false, user: null };
    }),
}));

export default useAuthStore;
