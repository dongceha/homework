const { User } = require('../model');
const jwt = require('../util/jwt');
const {jwtSecret} = require('../config/config.default')
// 用户登陆
exports.login = async (req, res, next) => {
    try {
        const user = req.user.toJSON();
        const token = await jwt.sign({
            userId: user._id
        }, jwtSecret, 
        // {
        //     expriesIn: 60
        // }
        );
        delete user.password;
        res.status(200).json({
            ...user,
            token,
        });
    } catch (error) {
        next(error);
    }
}
// 用户注册
exports.register = async (req, res, next) => {
    try {
        console.log(req.body)
        let user = new User(req.body.user);
        await user.save();
        user = user.toJSON();
        delete user.password;
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
}
// 获取当前登陆用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        // res.send('post /users/getCurrentUser');
        res.status(200).json({
            user: req.user
        })
    } catch (error) {
        next(error);
    }
}
// 更新当前用户
exports.updateCurrentUser = async (req, res, next) => {
    try {
        res.send('post /users/updateCurrentUser');
    } catch (error) {
        next(error);
    }
}