const express = require('express');
const userCtrl = require('../controller/user')
const { validationResult } = require('express-validator');
const userValidator = require('../validator/user');
const auth = require('../middleware/auth');
const router = express.Router();

// 用户登陆
router.post('/user/login', userValidator.login, userCtrl.login)
// 用户注册
router.post('/users', userValidator.register, userCtrl.register); // 3. 通过验证，执行具体的控制器处理
// 获取当前登陆用户
router.get('/user', auth, userCtrl.getCurrentUser);
// 更新当前用户
router.put('/user', userCtrl.updateCurrentUser);

module.exports = router;
