const { Article, User } = require('../model');

exports.getArticle = async (req, res, next) => {
    try {
        const {
            limit = 20,
            offset = 0,
            tag,
            author
        } = req.query;
        const filter = {};
        if (tag) {
            filter.tagList = tag;
        }
        if (author) {
            const user = await User.findOne({
                username: author,
            });
            filter.author = user ? user._id : null;
        }
        const articles = await Article
            .find(filter)
            .skip(Number.parseInt(offset))
            .limit(Number.parseInt(limit))
            .sort({
                createdAt: -1,
            });
        const articlesCount = await Article.countDocuments();
        res.status(200).json({
            articles,
            articlesCount
        })
    } catch (error) {
        next(error);
    }
}

exports.getArticleFeed = async (req, res, next) => {
    try {
        res.send('post /feed');
    } catch (error) {
        next(error);
    } 
}
exports.getArticleSlug = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleId)
            .populate('author');
        console.log(req.params.articleId, article)
        if (!article) {
            return res.status(404).end();
        }
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error);
    }
}
exports.createArticle = async (req, res, next) => {
    try {
        const article = new Article(req.body.article);
        article.author = req.user._id;
        article.populate('author').execPopulate()
        await article.save();
        res.status(201).json({article})
    } catch (error) {
        next(error);
    }
}
exports.updateArticle = async (req, res, next) => {
    try {
        // res.send(':slug');
        const article = req.article;
        const bodyArticle = req.body.article;
        article.title = bodyArticle.title || article.title;
        article.description = bodyArticle.description || article.description;
        article.body = bodyArticle.body || article.body;
        await article.save();
        res.staus(200).json({
            article
        })
    } catch (error) {
        next(error);
    }
}
exports.deleteArticle = async (req, res, next) => {
    try {
        const article = req.article;
        await article.remove();
        // res.send(':slug');
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}
exports.createCommit = async (req, res, next) => {
    try {
        res.send(':slug');
    } catch (error) {
        next(error);
    }
}
exports.getCommits = async (req, res, next) => {
    try {
        res.send(':slug');
    } catch (error) {
        next(error);
    }
}
exports.deleteCommits = async (req, res, next) => {
    try {
        res.send(':slug');
    } catch (error) {
        next(error);
    }
}