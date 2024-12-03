import { create } from "zustand";

interface HeaderState {
  isHamburgerVisible: boolean;
  isLoginVisible: boolean;
  isRegisterVisible: boolean;
  setHamburgerVisible: (visible: boolean) => void;
  setLoginVisible: (visible: boolean) => void;
  setRegisterVisible: (visible: boolean) => void;
}

const useHeaderStore = create<HeaderState>((set) => ({
  isHamburgerVisible: false,
  isLoginVisible: false,
  isRegisterVisible: false,
  setHamburgerVisible: (visible) => set({ isHamburgerVisible: visible }),
  setLoginVisible: (visible) => set({ isLoginVisible: visible }),
  setRegisterVisible: (visible) => set({ isRegisterVisible: visible }),
}));

export default useHeaderStore;
