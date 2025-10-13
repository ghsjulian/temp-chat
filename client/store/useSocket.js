import { create } from "zustand";
import axios from "../libs/axios";
import { saveMessages, getMessages, mergeMessages,updateMessagesById } from "../libs/indexDB";

const MESSAGES_PER_PAGE = 15;

const useSocket = create((set, get) => ({
    messages: [],
    hasMore: true,
    loadingMore: false,

    sendMessage: async message => {
        try {
            set({ messages: [...get().messages, message] });
            const response = await axios.post(
                `/messages/send-message/${message.receiver_id}`,
                message
            );
            await saveMessages(message.receiver_id, response?.data);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    },
    getChats: async receiverId => {
        try {
            set({ messages: [] });
            // Load from IndexedDB
            const localMessages = await getMessages(receiverId);
            const last15 = localMessages.slice(-MESSAGES_PER_PAGE);
            set({ messages: last15, hasMore: true });
            // Fetch latest from server and merge
            const response = await axios.get(
                `/messages/get-chats?id=${receiverId}`
            );
            if (response?.data?.success && Array.isArray(response.data.chats)) {
                // await mergeMessages(receiverId, response.data.chats);
                // Refresh state after merging
                const chats = response.data.chats;
                set({ messages: chats });
                await updateMessagesById(receiverId,chats)
                const updatedLocal = await getMessages(receiverId);
                console.log(updatedLocal);
            }
        } catch (error) {
            console.error("Error loading chats:", error);
        }
    },

    // Load more messages (from server only)
    loadMoreMessages: async receiverId => {
        const { messages, loadingMore, hasMore } = get();
        if (loadingMore || !hasMore) return;

        set({ loadingMore: true });
        try {
            const oldestTime = messages[0]?.time;
            const response = await axios.get(
                `/messages/load-older?id=${receiverId}&before=${oldestTime}`
            );
            if (response?.data?.success && response.data.messages.length > 0) {
                set({
                    messages: [...response.data.messages, ...messages],
                    hasMore:
                        response.data.messages.length === MESSAGES_PER_PAGE,
                    loadingMore: false
                });
            } else {
                set({ hasMore: false, loadingMore: false });
            }
        } catch (error) {
            console.error("Error loading older messages:", error);
            set({ loadingMore: false });
        } finally {
            set({ loadingMore: false, hasMore: false });
        }
    }
}));

export default useSocket;
