exports.getTags = async (req, res, next) => {
    try {
        res.send('获取标签列表');
    } catch (error) {
        next(error);
    }
}