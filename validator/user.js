const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { User } = require("../model");

exports.register = validate([
    // 1. validate role
    body("user.username")
        .notEmpty().withMessage("username should not be empty")
        .custom(async (value) => {
            // check value exist in db
            const user = await User.findOne({ username: value });
            if (user) {
                return Promise.reject("user is exist");
            }
        }),

    body("user.password").notEmpty().withMessage("password should not be empty"),

    body("user.email")
        .notEmpty().withMessage("email should not be empty")
        .isEmail().withMessage("email format error")
        .bail() // 錯誤不執行之後的行為
        .custom(async (value) => {

            const user = await User.findOne({ email: value });
            if (user) {
                return Promise.reject("email is exist");
            }
        }),
]);

exports.login = [
    validate([
        body("user.emil").notEmpty().withMessage("email should not be empty"),
        body("user.password").notEmpty().withMessage("password should not be empty"),
    ]),
    // 驗證用戶是否存在
    validate([
        body("user.emil").custom(async (email, { req }) => {
            const user = await User.findOne({ email }).select([
                "email",
                "password",
                "username",
                "bio",
                "image",
            ]);

            if (!user) {
                return Promise.reject("用户不存在");
            }
            // 將數據掛載到請求對像中，後續的中間件也可以直接使用，就不需要重複查詢了
            req.user = user;
        }),
    ]),
    // 驗證密碼
    validate([
        body("user.password").custom(async (password, { req }) => {
            if (md5(password) !== req.user.password) {
                return Promise.reject("密碼錯誤");
            }
        }),
    ]),
];
