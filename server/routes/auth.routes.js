const express = require("express")
const router = express.Router()
const loginController = require("../controllers/login.controller")
const signupController = require("../controllers/signup.controller")
const searchController = require("../controllers/search.controller")
const randomUsers = require("../controllers/random-users.controller")
const isLogin = require("../middlewares/is.login")

router.post("/auth/login",loginController)
router.post("/auth/signup",signupController)
router.get("/auth/users/search",isLogin,searchController)
router.get("/auth/users/random",isLogin,randomUsers)

module.exports = router