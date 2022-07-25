const { body, param } = require("express-validator");
const validate = require("../middleware/validate");

exports.createArticle = validate([
    body("article.title").notEmpty().withMessage("title not be empty"),
    body("article.description").notEmpty().withMessage("description not be empty"),
    body("article.body").notEmpty().withMessage("body not be empty"),
]);


exports.getArticle = validate([
    param("articleId").custom(async (value) => {
        if (!mongoose.isValidObjectId(value)) {
            return Promise.reject("ID format error");
        }
    }),
]);
