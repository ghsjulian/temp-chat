import { useRef } from "react";
import { create } from "zustand";
import axios from "../libs/axios";
import useSocket from "./useSocket";
import { deleteDB } from "../libs/indexDB";
import useAuth from "./useAuth";

const useApp = create((set, get) => ({
    searchUsers: [],
    randomUsers: [],
    chatUsers: [],
    selectedUser: JSON.parse(localStorage.getItem("chat-user")) || {},
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
    renderChatUser: () => {
        set({ searchUsers: [] });
        set({ randomUsers: [] });
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
            const res = await axios.get("/messages/get-chat-users");
            if (res?.data.length > 0) {
                set({ chatUsers: res?.data });
            }
        } catch (error) {
            console.error("Error getSidebarUsers :", error);
        }
    },
    setChatUser: async user => {
        await useSocket.getState().getChats(user?._id);
        localStorage.setItem("chat-user", JSON.stringify(user));
        set({ selectedUser: user });
    },
    logout: async () => {
        try {
            const response = await axios.post("/auth/user/logout");
            if (response?.data?.success) {
                localStorage.removeItem("tempchat");
                localStorage.removeItem("chat-user");
                useAuth.setState({ user: null });
                set({
                    searchUsers: [],
                    chatUsers: [],
                    selectedUser: {},
                    randomUsers: []
                });
                await deleteDB();
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }
}));

export default useApp;
