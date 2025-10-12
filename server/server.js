// Requiring All Packages
require("dotenv").config();
const path = require("node:path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const socketServer = require("./socketio/socket-server");
const createConnection = require("./configs/db.config");
const myServer = new socketServer();
const seedNow = require("./seeder")
const publicPath = path.join(__dirname, "../public/");
myServer.app.use(express.json({ limit: "1000mb" }));
myServer.app.use(
    cors({
        origin: "http://localhost:5000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        maxAge: 86400
    })
);
myServer.app.use(cookieParser());
myServer.app.use(express.static(publicPath));
/*--------------------------------------------------------------*/
myServer.app.use("/api/v1", require("./routes/auth.routes"));
myServer.app.use("/api/v1/messages", require("./routes/message.routes"));
/*--------------------------------------------------------------*/

console.clear();
myServer.server.listen(PORT, async () => {
    await createConnection();
    console.log(`\n[+] Express Server Running !`);
    console.log(`\n[+] Host : http://${HOST}:${PORT}\n`);
    seedNow()
});


