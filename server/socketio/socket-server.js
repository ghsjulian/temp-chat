// Require All The Packages
const path = require("node:path");
const http = require("node:http");
const express = require("express");
const { Server } = require("socket.io");

class SocketServer {
    constructor() {
        this.IO = null;
        this.app = null;
        this.server = null;
        this.clients = new Set();
        this.typeingUsers = new Set();
        this.createConnection();
    }
    createConnection() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.IO = new Server(this.server, {
            cors: {
                origin: "*"
            }
        });
        this.IO.use((socket, next) => {
            const user = socket?.handshake?.auth?.user;
            if (user?.name) {
                return next();
            } else {
                console.log("Handshake failed for:", user?.name);
                return next(new Error("Authentication Error"));
            }
        });
        this.IO.on("connection", socket => {
            const user = socket?.handshake?.auth?.user;
            const clientName = user?.name;
            const clientId = user?._id;
            this.clients[clientId] = socket;
            this.handshakeComplete(clientId);
            this.sendChatUsers(clientId);
            console.log(`\n[+] ${clientName} Connected !`);
            console.log(`\n[+] ${clientName}'s Socket ID - ${clientId}\n`);

            socket.on("send-message", async data => {
                const to = data?.to;
                const from = data?.from;
                if (this.typeingUsers[from]) {
                    delete this.typeingUsers[from];
                    this.clients[to].emit(
                        "typing-status",
                        Object.keys(this.typeingUsers)
                    );
                }
                this.clients[to].emit("receive-message", data?.message);
            });
            socket.on("typing-status", async data => {
                const to = data?.to;
                const typer = data?.typer;
                this.typeingUsers[typer] = true;
                this.clients[to].emit(
                    "typing-status",
                    Object.keys(this.typeingUsers)
                );
            });

            socket.on("logout", (id) => {
                delete this.clients[id];
                this.sendChatUsers(id);
                console.log(`\n[-] ${clientName} Logout Successfully!\n`);
            });
            socket.on("disconnect", () => {
                delete this.clients[clientId];
                this.sendChatUsers(clientId);
                console.log(`\n[-] ${clientName} Disconnected!\n`);
            });
        });
    }
    genuserid(name) {
        if (!name) return;
        let uniqeName = name.replace(/\s+/g, "");
        return "sock-id-" + uniqeName;
    }
    handshakeComplete(clientId) {
        this.clients[clientId].emit("handshake-success", {
            type: "HANDSHAKE",
            status: "SUCCESS",
            clientId
        });
    }
    sendChatUsers(clientId) {
        const users = Object.keys(this.clients);
        this.IO.emit("chat-users", users);
    }
}

module.exports = SocketServer;
