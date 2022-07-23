// Get Profile 獲取用戶資料
exports.getProfile = async (req, res, next) => {
    try {
        // 處理請求
        res.send("get /profile/:username");
    } catch (err) {
        next(err);
    }
};

// Follow user 關注用戶
exports.followProfile = async (req, res, next) => {
    try {
        // 處理請求
        res.send("post /profile/:username/follow");
    } catch (err) {
        next(err);
    }
};

// Unfollow user 取消關注用戶
exports.unfollowProfile = async (req, res, next) => {
    try {
        // 處理請求
        res.send("delete /profile/:username/follow");
    } catch (err) {
        next(err);
    }
};
