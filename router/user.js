const express = require("express");
const userController = require("../controller/user");
const router = express.Router();
const userValidator = require("../validator/user");
const auth = require('../middleware/auth')
// Authentication 用戶登錄
router.post("/users/login", userValidator.login, userController.login);

// Registration 用戶註冊
router.post("/users", userValidator.register, userController.register);

// Get Current User 獲取當前登錄用戶
router.get("/user", auth, userController.getCurrentUser);

// Update User 更新用戶
router.put("/user", userController.updateUser);

module.exports = router;