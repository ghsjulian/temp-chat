import { create } from "zustand";

const useApp = create((set, get) => ({
    isOpen: false,
    openChat: () => {
        set({ isOpen:true });
    },
    closeChat: () => {
        set({ isOpen:false });
    }
}));

export default useApp;
