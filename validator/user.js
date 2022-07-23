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
