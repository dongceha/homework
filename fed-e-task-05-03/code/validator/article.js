const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const md5 = require('../util/md5');
const mongoose = require('mongoose');
const { Article } = require('../model');

exports.createArticle = validate([
    body('article.title')
        .notEmpty().withMessage('文章标题不能为空'),
    body('article.description')
        .notEmpty().withMessage('文章摘要不能为空'), // 验证 req.body
    body('article.body')
        .notEmpty().withMessage('文章内容不能为空'), // 验证 req.body
]);
exports.getArticle = validate([
    validate.isValidObjectId(['params'], 'articleId')
    // param('articleId').custom(value => {
    //     if (!mongoose.isValidObjectId(value)) {
    //         throw new Error('文章Id类型错误');
    //     }
    //     return true;
    // })
]);
exports.updateArticle = [
    validate.isValidObjectId(['params'], 'articleId'),
    async (req, res, next) => {
        const articleId = req.params.articleId;
        console.log('articleId====', articleId)
        const article = await Article.findById(articleId);
        req.article = article;
        if (!article) {
            return res.status(404).end()
        }
        next()
    },
    async (req, res, next) => {
        console.log('req.article=====', req.user, req.article)
        if (req.user._id.toString() !== req.article.author.toString()) {
            return res.status(403).end()
        }
        next()
    }
];
exports.deleteArticle = exports.updateArticle;
