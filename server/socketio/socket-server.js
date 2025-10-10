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
            const clientName = socket?.handshake?.auth?.name;
            if (clientName) {
                return next();
            } else {
                console.log("Handshake failed for:", clientName);
                return next(new Error("Authentication Error"));
            }
        });
        this.IO.on("connection", socket => {
            const clientName = socket?.handshake?.auth?.name;
            const clientId = this.genuserid(clientName);
            this.clients[clientId] = socket
            this.handshakeComplete(clientId);
            console.log(`\n[+] ${clientName} Connected !`);
            console.log(`\n[+] ${clientName}'s Socket ID - ${clientId}\n`);

            socket.on("disconnect", () => {
                console.log(`\n[-] ${clientName} Disconnected!\n`);
            });
        });
    }
    genuserid(name) {
        if (!name) return;
        let uniqeName = name.replace(/\s+/g, "");
        return "sock-id-" + uniqeName;
    }
    handshakeComplete(clientId){
        this.clients[clientId].emit("handshake-success",({
            type : "HANDSHAKE",
            status : "SUCCESS",
            clientId
        }))
    }
}

module.exports = SocketServer;
