const util = require("util");
// err 格式需要format
module.exports = () => {
    return (err, req, res, next) => {
        res.status(500).json({
            error: util.format(err),
        });
    };
};
