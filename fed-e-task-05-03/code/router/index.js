const express = require('express');
const router = express.Router();

router.use(require('./user'));
router.use('/profiles', require('./profile'));
router.use('/tag', require('./tag'));
router.use('/article', require('./article'));

module.exports = router;
