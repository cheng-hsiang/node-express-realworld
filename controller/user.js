const { User } = require('../model')
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");

// Authentication 用戶登錄
exports.login = async (req, res, next) => {
    try {

        const user = req.user.toJSON();
        const token = await jwt.sign(
            {
                userId: user._id,
            },
            jwtSecret,
            {
                expiresIn: 60 * 60 * 24,
            }
        );

        delete user.password;
        res.status(200).json({
            ...user,
            token,
        });
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
        // user = user.toJSON();
        // delete user.password;
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
        // 处理请求
        res.status(200).json({
          user: req.user,
        });
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