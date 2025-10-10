const router = require("express").Router();
const isLogin = require("../middlewares/is.login");
const getChatUsers = require("../controllers/user-chat.controller");
const sendMessage = require("../controllers/send-message.controller");

router.get("/get-chats", isLogin, getChatUsers);
router.post("/send-message/:id", isLogin, sendMessage);

module.exports = router;
