const { Article } = require("../model")
// List Articles
exports.listArticles = async (req, res, next) => {
    try {

        const { limit = 20, offset = 0, tag, author } = req.query;


        const filter = {};
        if (tag) {
            filter.tagList = tag;
        }
        if (author) {
            const user = await User.findOne({ username: author });
            filter.author = user ? user._id : null;
        }

        const articles = await Article.find(filter)
            .skip(+offset)
            .limit(+limit);
        const articlesCont = await Article.countDocuments();
        res.status(200).json({
            articles,
            articlesCont,
        });
        res.send("get /articles/");
    } catch (err) {
        next(err);
    }
};

// Feed Articles
exports.feedArticles = async (req, res, next) => {
    try {
        // 處理請求
        res.send("get /articles/feed");
    } catch (err) {
        next(err);
    }
};

// Get Article
exports.getArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleId).populate("author");
        if (!article) {
            return res.status(404).end();
        }
        res.status(200).json({
            article,
        });
    } catch (err) {
        next(err);
    }
};

// Create Article
exports.createArticle = async (req, res, next) => {
    try {
        const article = new Article(req.body.article);

        // token get id
        article.author = req.user._id;
        // mapping user
        article.populate("author")

        await article.save();
        res.status(201).json({
            article,
        });
    } catch (err) {
        next(err);
    }
};


// Update Article
exports.updateArticle = async (req, res, next) => {
    try {
        const article = req.article;
        const bodyArticle = req.body.article;
        article.title = bodyArticle.title || article.title;
        article.description = bodyArticle.description || article.description;
        article.body = bodyArticle.body || article.body;
        await article.save();
        res.status(200).json({
            article,
        });
    } catch (err) {
        next(err);
    }
};

// Delete Article
exports.deleteArticle = async (req, res, next) => {
    try {
        console.log(req.article);
        const article = req.article;
        await article.remove();
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};
// Add Comments to an Article
exports.addCommentstoanArticle = async (req, res, next) => {
    try {
        // 處理請求
        res.send("post /articles/:slug/comments");
    } catch (err) {
        next(err);
    }
};

// Get Comments from an Article
exports.getCommentsFromAnArticle = async (req, res, next) => {
    try {
        // 處理請求
        res.send("get /articles/:slug/comments");
    } catch (err) {
        next(err);
    }
};

// Delete Comment
exports.DeleteComment = async (req, res, next) => {
    try {
        // 處理請求
        res.send("delete /articles/:slug/comments/:id");
    } catch (err) {
        next(err);
    }
};

// Favorite Article
exports.FavoriteArticle = async (req, res, next) => {
    try {
        // 處理請求
        res.send("post /articles/:slug/favorite");
    } catch (err) {
        next(err);
    }
};

// Unfavorite Article
exports.UnfavoriteArticle = async (req, res, next) => {
    try {
        // 處理請求
        res.send("delete /articles/:slug/favorite");
    } catch (err) {
        next(err);
    }
};