import { create } from "zustand";

interface HeaderState {
  isHamburgerVisible: boolean;
  isLoginVisible: boolean;
  isRegisterVisible: boolean; // Lägg till detta
  setHamburgerVisible: (visible: boolean) => void;
  setLoginVisible: (visible: boolean) => void;
  setRegisterVisible: (visible: boolean) => void; // Lägg till detta
}

const useHeaderStore = create<HeaderState>((set) => ({
  isHamburgerVisible: false,
  isLoginVisible: false,
  isRegisterVisible: false, // Standard: dold
  setHamburgerVisible: (visible) => set({ isHamburgerVisible: visible }),
  setLoginVisible: (visible) => set({ isLoginVisible: visible }),
  setRegisterVisible: (visible) => set({ isRegisterVisible: visible }), // Ny metod
}));

export default useHeaderStore;
