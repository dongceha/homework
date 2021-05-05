const express = require('express');
const profile = require('../controller/profile');
const router = express.Router();

// 获取用户资料
router.get('/:username', profile.getUserProfile);
// 关注用户
router.post('/:username/follow', profile.profileFollow);
// 取消关注
router.delete('/:username/follow', profile.profileDeleteFollow);

module.exports = router;
