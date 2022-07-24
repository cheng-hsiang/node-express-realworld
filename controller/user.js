const { User } = require('../model')

// Authentication 用戶登錄
exports.login = async (req, res, next) => {
    try {
        // 處理請求
        JSON.parse('dsdsadas')
        res.send("post /users/login");
    } catch (err) {
        next(err);
    }
};

// Registration 用戶註冊
exports.register = async (req, res, next) => {
    try {
        // 處理請求
        const user = new User(req.body.user)
        await user.save()
        user = user.toJSON();
        delete user.password;
        res.status(201).json({
            user
        })
    } catch (err) {
        next(err);
    }
};

// Get Current User 獲取當前登錄用戶
exports.getCurrentUser = async (req, res, next) => {
    try {
        // 處理請求
        res.send("get /user");
    } catch (err) {
        next(err);
    }
};

// Update User 更新用戶
exports.updateUser = async (req, res, next) => {
    try {
        // 處理請求
        res.send("put /user");
    } catch (err) {
        next(err);
    }
};