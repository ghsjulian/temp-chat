import { useRef } from "react";
import { create } from "zustand";
import axios from "../libs/axios";

const useApp = create((set, get) => ({
    searchUsers: [],
    randomUsers : [],
    chatUsers: [],
    selectedUser: {},
    isactiveChatHeader: false,
    isSettingOpen: false,
    isSearch: false,
    appTheme: null,
    chatTheme: null,

    activeHeader: type => {
        set({ isactiveChatHeader: type });
    },
    openSetting: type => {
        set({ isSettingOpen: type });
    },
    setSearch: () => {
        set({ isSearch: !get().isSearch });
    },
    renderSearch: async term => {
        try {
            const res = await axios.get(`/auth/users/search?q=${term}`);
            if (res?.data?.length > 0) {
                set({ searchUsers: res?.data });
            }
        } catch (error) {
            console.error("Error : ", error?.response?.data?.message);
        }
    },
    getRandomUsers: async () => {
        try {
            const res = await axios.get("/auth/users/random");
            if (res?.data.length > 0) {
                set({ randomUsers: res?.data });
            }
        } catch (error) {
            console.error("Error getRandomUsers :", error);
        }
    },
    getChatUsers: async () => {
        try {
            const res = await axios.get("/messages/get-chats");
            if (res?.data.length > 0) {
                set({ chatUsers: res?.data });
            }
        } catch (error) {
            console.error("Error getSidebarUsers :", error);
        }
    },
    setChatUser: user => {
        set({ selectedUser: user });
    }
}));

export default useApp;
