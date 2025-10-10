import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import "./Messenger.css";

// Sample chat data
const initialChats = [
  {
    id: 1,
    name: "Alice",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    avatar: "#007bff",
    messages: [
      { text: "Hello!", sent: false, time: "10:00 AM" },
      { text: "Hi there!", sent: true, time: "10:05 AM" },
      { text: "Hey, how are you?", sent: false, time: "10:30 AM" },
    ],
  },
  {
    id: 2,
    name: "Bob",
    lastMessage: "See you tomorrow.",
    time: "Yesterday",
    avatar: "#28a745",
    messages: [
      { text: "Meeting at 2?", sent: true, time: "Yesterday" },
      { text: "Yes, see you.", sent: false, time: "Yesterday" },
    ],
  },
];

const Messenger = () => {
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("chats");

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSendMessage = (chatId, messageText) => {
    if (!messageText.trim()) return;

    const newMessage = {
      text: messageText.trim(),
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedChats = chats.map((c) =>
      c.id === chatId
        ? {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: newMessage.text,
            time: newMessage.time,
          }
        : c
    );

    setChats(updatedChats);
    setActiveChat(updatedChats.find((c) => c.id === chatId));
  };

  return (
    <div className="messenger-container">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {activeChat && (
        <ChatArea
          chat={activeChat}
          onBack={() => setActiveChat(null)}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default Messenger;
