import { create } from "zustand";
import axios from "../libs/axios";

const useSocket = create((set, get) => ({
    messages: [],
    sendMessage: async message => {
        try {
            set({ messages: [...get().messages, message] });
            const response = await axios.post(
                "/messages/send-message/" + message?.receiver_id,
                message
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    },
    getChats: async (id) => {
        try {
            const response = await axios.get("/messages/get-chats?id="+id);
            if(response?.data?.success){
                set({messages : response?.data?.chats})
            } else {
                set({messages:[]})
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}));

export default useSocket;
