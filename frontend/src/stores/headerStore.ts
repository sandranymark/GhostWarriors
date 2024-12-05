import { create } from "zustand";

interface HeaderState {
  isLoginVisible: boolean;
  isHamburgerVisible: boolean;
  isRegisterVisible: boolean;
  setLoginVisible: (visible: boolean) => void;
  setHamburgerVisible: (visible: boolean) => void;
  setRegisterVisible: (visible: boolean) => void;
}

const useHeaderStore = create<HeaderState>((set) => ({
  isHamburgerVisible: false,
  isLoginVisible: false,
  isRegisterVisible: false,
  setLoginVisible: (visible) => set({ isLoginVisible: visible }),
  setHamburgerVisible: (visible) => set({ isHamburgerVisible: visible }),
  setRegisterVisible: (visible) => set({ isRegisterVisible: visible }),
}));

export default useHeaderStore;

// Författare Adréan
