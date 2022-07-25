const { verify } = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");
const { User } = require("../model");

module.exports = async (req, res, next) => {
    let token = req.headers.authorization;
    token = token ? token.split("Bearer ")[1] : null;
    if (!token) {
        return res.status(401).end();
    }
    try {

        const decodedToken = await verify(token, jwtSecret);
        console.log('decodedToken:', decodedToken);

        // 將user資料驗證成功後直接掛載到request上面給後續組件使用
        req.user = await User.findById(decodedToken.userId);
        next();
    } catch (err) {
        return res.status(401).end();
    }

};
