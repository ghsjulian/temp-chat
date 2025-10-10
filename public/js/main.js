import userMessages from "./messages.js";
const settingsBtn = document.querySelector("#settings");
const usersBtn = document.querySelector("#users");
const chatList = document.querySelector(".chat-list");
const header = document.querySelector("header");
const chatHeader = document.querySelector(".chat-header");
const closeChat = document.querySelector(".chat-header #close");
const aside = document.querySelector("aside");
const mainContainer = document.querySelector("main");
const footer = document.querySelector("footer");
const chatBox = document.querySelector(".chat-box");
// Select Footer Items
const inputMesage = document.querySelector("footer input");
const sendbtn = document.querySelector("footer .send");
let selectedUser = null;

// Append Message
const appendMessage = (id, newMessage) => {
    const message = document.createElement("div");
    message.className =
        newMessage.sender === "me" ? "message sent" : "message received";
    message.innerHTML = `
            ${newMessage.text}
            <div class="message-time">${newMessage.time}</div>
        `;
    message.style.animation = "shake .6s linear";
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
};
const renderBubles = chats => {
    chatBox.innerHTML = "";
    chats.forEach((item, idx) => {
        const message = document.createElement("div");
        message.className =
            item.sender === "me" ? "message sent" : "message received";
        message.innerHTML = `
            ${item.text}
            <div class="message-time">${item.time}</div>
        `;
        chatBox.appendChild(message);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
};
const renderConversation = id => {
    if (userMessages?.length > 0) {
        const filteredMessage = userMessages?.filter(users => {
            return users?._id === id;
        });
        if (filteredMessage[0]?.messages?.length > 0) {
            renderBubles(filteredMessage[0].messages);
        }
    }
};

const openChatbox = userId => {
    mainContainer.style.zIndex = "9";
    footer.style.display = "flex";
    chatHeader.style.display = "flex";
    renderConversation(userId);
};
closeChat.onclick = () => {
    mainContainer.style.zIndex = "0";
    footer.style.display = "none";
    chatHeader.style.display = "none";
};

// For Sending New Message
inputMesage.addEventListener("keydown", e => {
    if (e.keyCode === 13) {
        const value = inputMesage.value.trim();
        if (!value) {
            inputMesage.focus();
            return;
        }
        const now = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
        appendMessage(selectedUser, {
            text: value,
            sender: "me",
            time: now
        });
        inputMesage.value = "";
        inputMesage.focus();
    }
});
sendbtn.onclick = () => {
    const value = inputMesage.value.trim();
    if (!value) {
        inputMesage.focus();
        return;
    }
    const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
    appendMessage(selectedUser, {
        text: value,
        sender: "me",
        time: now
    });
    inputMesage.value = "";
    inputMesage.focus();
};
document.addEventListener("DOMContentLoaded", () => {
    if (userMessages?.length > 0) {
        userMessages.forEach(user => {
            const chatUser = document.createElement("div");
            chatUser.className = "chat-user";
            chatUser.innerHTML = `
                        <img src="icons/user.png" />
                            <div class="user">
                                <span>${user.name}</span>
                                <p id="last-message">${user.lastMessage}</p>
                            </div>
                        <time>${user.time}</time>`;
            chatUser.onclick = () => {
                openChatbox(user._id);
            };
            chatList.appendChild(chatUser);
        });
    }
});
