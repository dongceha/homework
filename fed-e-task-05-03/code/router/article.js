const express = require('express');
const articleCtrl = require('../controller/article');
const auth = require('../middleware/auth');
const articleValidate = require('../validator/article');
const router = express.Router();
// 获取文章列表
router.get('/', articleCtrl.getArticle);
// 获取用户关注的作者文章列表
router.get('/feed', articleCtrl.getArticleFeed);
// 获取文章
router.get('/:articleId', articleValidate.getArticle, articleCtrl.getArticleSlug);
// 创建文章
router.post('/', auth, articleValidate.createArticle, articleCtrl.createArticle);
// 更新文章
router.put('/:articleId', auth, articleValidate.updateArticle,articleCtrl.updateArticle);
// 删除文章
router.delete('/:articleId', auth, articleValidate.deleteArticle, articleCtrl.deleteArticle);
// 增加文章评论
router.post('/:slug/comments', articleCtrl.createCommit);
// 获取文章评论列表
router.get('/:slug/comments', articleCtrl.getCommits);
// 删除文章评论列表
router.delete('/:slug/comments', articleCtrl.deleteCommits);
module.exports = router;
