const express = require("express");
const router = express.Router();
const articleController = require("../controller/article");

// List Articles
router.get("/", articleController.listArticles);

// Feed Articles
router.get("/feed", articleController.feedArticles);

// Get Article
router.get("/:slug", articleController.getArticle);

// Create Article
router.post("/", articleController.createArticle);

// Update Article
router.put("/:slug", articleController.updateArticle);

// Delete Article
router.delete("/:slug", articleController.deleteArticle);

// Add Comments to an Article
router.post("/:slug/comments", articleController.addCommentstoanArticle);

// Get Comments from an Article
router.get("/:slug/comments", articleController.getCommentsFromAnArticle);

// Delete Comment
router.delete("/:slug/comments/:id", articleController.deleteArticle);

// Favorite Article
router.post("/:slug/favorite", articleController.FavoriteArticle);

// Unfavorite Article
router.delete("/:slug/favorite", articleController.UnfavoriteArticle);

module.exports = router;