const express = require("express");
const router = express.Router();
const profileController = require('../controller/profile')
// Get Profile 獲取用戶資料
router.get("/:username", profileController.getProfile);

// Follow user 關注用戶
router.post("/:username/follow", profileController.followProfile);

// Unfollow user 取消關注用戶
router.delete("/:username/follow", profileController.unfollowProfile);

module.exports = router;