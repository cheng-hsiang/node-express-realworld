const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const mongoose = require('mongoose');

exports.createArticle = validate([
    body("article.title").notEmpty().withMessage("title not be empty"),
    body("article.description").notEmpty().withMessage("description not be empty"),
    body("article.body").notEmpty().withMessage("body not be empty"),
]);


exports.getArticle = validate([
    validate.isValidObjectId(["params"], "articleId"),
    // param("articleId").custom(async (value) => {
    //   if (!mongoose.isValidObjectId(value)) {
    //     return Promise.reject("id error");
    //   }
    // }),
]);

// exports.updateArticle = validate([
//     validate.isValidObjectId(["params"], "articleId"),
// ]);

exports.updateArticle = [
    validate([validate.isValidObjectId(["params"], "articleId")]),
    async (req, res, next) => {
        const articleId = req.params.articleId;
        const article = await Article.findById(articleId);
        req.article = article;
        if (!article) {
            return res.status(404).end();
        }
        next();
    },
    // 是否為當前用戶
    async (req, res, next) => {
        console.log(typeof (req.user._id), typeof (req.article.author));// object object
        if (req.user._id.toString() !== req.article.author.toString()) {
            return res.status(403).end();
        }
        next();
    },
];

exports.deleteArticle = exports.updateArticle
