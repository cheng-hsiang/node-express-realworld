const express = require("express");
const router = express.Router();
const tagController = require('../controller/tag')
// Get Tags
router.get("/tags", tagController.getTag);

module.exports = router;