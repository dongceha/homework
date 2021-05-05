const { verify } = require("../util/jwt");
const {jwtSecret} = require('../config/config.default');
const { User } = require("../model");

module.exports = async (req, res, next) => {
    // 从请求头获取 token 数据
    let token = req.headers['authorization'];
    // 验证token 是否有效
    token = token ? token.split('Bearer ')[1] : null;
    // 无效 -> 
    if (!token) {
        return res.status(401).end();
    }
    try {
        const decodedToken = await verify(token, jwtSecret);
        console.log(decodedToken);
        req.user = await User.findById(decodedToken.userId)
        next();
    } catch (error) {
        return res.status(401).end();
    }
}