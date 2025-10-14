import { create } from "zustand";
import { io } from "socket.io-client";
import { saveMessages, getMessages, mergeMessages } from "../libs/indexDB"; // optional IndexedDB utils

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "https://your-server.com";
const MESSAGES_PER_PAGE = 20;

const useSocket = create((set, get) => ({
    socket: null,
    connected: false,
    messages: [],
    hasMore: true,
    loading: false,

    // 🔹 Initialize & connect socket
    connectSocket: (token) => {
        if (get().socket) return; // prevent duplicate connections

        const socket = io(SOCKET_URL, {
            transports: ["websocket"],
            auth: { token },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
            set({ connected: true });
        });

        socket.on("disconnect", () => {
            console.log("❌ Socket disconnected");
            set({ connected: false });
        });

        socket.on("connect_error", (err) => {
            console.error("⚠️ Connection error:", err.message);
        });

        // 🔹 Incoming message
        socket.on("message", async (msg) => {
            console.log("📩 New message:", msg);
            set((state) => ({ messages: [...state.messages, msg] }));
            await saveMessages(msg); // optional for offline cache
        });

        // 🔹 Message updated/deleted event
        socket.on("message:update", (updatedMsg) => {
            set((state) => ({
                messages: state.messages.map((m) =>
                    m._id === updatedMsg._id ? updatedMsg : m
                ),
            }));
        });

        socket.on("message:delete", (deletedId) => {
            set((state) => ({
                messages: state.messages.filter((m) => m._id !== deletedId),
            }));
        });

        set({ socket });
    },

    // 🔹 Disconnect socket
    disconnectSocket: () => {
        const socket = get().socket;
        if (socket) {
            socket.disconnect();
            set({ socket: null, connected: false });
        }
    },

    // 🔹 Send message
    sendMessage: async (data) => {
        const socket = get().socket;
        if (!socket || !get().connected) return;

        socket.emit("message", data);
        set((state) => ({ messages: [...state.messages, data] }));
        await saveMessages(data);
    },

    // 🔹 Load messages (IndexedDB + server)
    loadMessages: async (chatId, page = 1) => {
        if (get().loading || !chatId) return;

        set({ loading: true });

        try {
            // Fetch from IndexedDB first
            const localMessages = await getMessages(chatId, page, MESSAGES_PER_PAGE);
            if (localMessages.length) {
                set((state) => ({
                    messages: mergeMessages(state.messages, localMessages),
                }));
            }

            // Optionally fetch from server
            const socket = get().socket;
            socket?.emit("messages:fetch", { chatId, page });

            socket?.once("messages:fetch:response", (serverMessages) => {
                if (serverMessages.length < MESSAGES_PER_PAGE) {
                    set({ hasMore: false });
                }
                set((state) => ({
                    messages: mergeMessages(state.messages, serverMessages),
                }));
                serverMessages.forEach(saveMessages);
                set({ loading: false });
            });
        } catch (err) {
            console.error("⚠️ Failed to load messages:", err);
            set({ loading: false });
        }
    },

    // 🔹 Clear messages (for switching chats)
    clearMessages: () => {
        set({ messages: [], hasMore: true });
    },
}));

export default useSocket;
