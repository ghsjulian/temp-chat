import { create } from "zustand";
import axios from "../libs/axios";
import { saveMessages, getMessages, mergeMessages } from "../libs/indexDB";

const useSocket = create((set, get) => ({
    messages: [],
    sendMessage: async message => {
        try {
            // Save locally for instant UI
            await saveMessages(message?.receiver_id, message);
            set({ messages: [...get().messages, message] });
            // Send to backend
            const response = await axios.post(
                `/messages/send-message/${message?.receiver_id}`,
                message
            );
            // Sync with server confirmation (replace temp)
            if (response?.data?.message) {
                await saveMessages(message?.receiver_id, [
                    response.data.message
                ]);
            }
            console.log("Message sent");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    },

    getChats: async receiverId => {
        try {
            const localMessages = await getMessages(receiverId);
            set({ messages: localMessages });
            const response = await axios.get(
                `/messages/get-chats?id=${receiverId}`
            );
            if (response?.data?.success) {
                const synced = await mergeMessages(
                    receiverId,
                    response.data.chats
                );
                set({ messages: synced });
            }
        } catch (error) {
            console.error("Error loading chats:", error);
        }
    }
}));

export default useSocket;
