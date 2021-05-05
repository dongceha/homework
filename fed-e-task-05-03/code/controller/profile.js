exports.getUserProfile = async (req, res, next) => {
    try {
        res.send('post /profiles/:username');
    } catch (error) {
        next(error);
    }
}

exports.profileFollow = async (req, res, next) => {
    try {
        res.send('post /profiles/:username/follow');
    } catch (error) {
        next(error);
    }
}
exports.profileDeleteFollow = async (req, res, next) => {
    try {
        res.send('post /profiles/:username/follow');
    } catch (error) {
        next(error);
    }
}