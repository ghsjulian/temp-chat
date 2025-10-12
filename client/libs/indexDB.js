import { openDB } from "idb";

// Create DB
export const db = await openDB("tempchat", 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains("messages")) {
            const store = db.createObjectStore("messages", {
                keyPath: "id",
                autoIncrement: true
            });
            store.createIndex("chatId", "chatId", { unique: false });
            store.createIndex("messageId", "messageId", { unique: true });
        }
    }
});

export const saveMessages = async (chatId, messages) => {
    if (!messages?.length) return;

    const tx = db.transaction("messages", "readwrite");
    const store = tx.objectStore("messages");

    for (const msg of messages) {
        const existing = await store
            .index("messageId")
            .get(msg._id || msg.messageId);
        if (!existing) {
            await store.add({
                chatId,
                messageId: msg._id || msg.messageId || crypto.randomUUID(),
                ...msg
            });
        }
    }

    await tx.done;
};

export const getMessages = async (chatId, limit = 50) => {
    const tx = db.transaction("messages", "readonly");
    const store = tx.objectStore("messages");
    const all = await store.getAll();
    const filtered = all
        .filter(m => m.chatId === chatId)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .slice(-limit);
    await tx.done;
    return filtered;
};

export const mergeMessages = async (chatId, serverMessages) => {
    const local = await getMessages(chatId);
    const all = [...local];

    for (const msg of serverMessages) {
        const exists = local.find(m => m._id === msg._id);
        if (!exists) all.push(msg);
    }

    await saveMessages(chatId, all);
    return all;
};
