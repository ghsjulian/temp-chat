const router = require("express").Router();
const isLogin = require("../middlewares/is.login");
const getChats = require("../controllers/get-chats.controller");
const getChatUsers = require("../controllers/user-chat.controller");
const sendMessage = require("../controllers/send-message.controller");
const loadOlderMessages = require("../controllers/load-messages.controller");

router.get("/get-chat-users", isLogin, getChatUsers);
router.get("/get-chats", isLogin, getChats);
router.get("/load-older", isLogin, loadOlderMessages);
router.post("/send-message/:id", isLogin, sendMessage);

module.exports = router;
