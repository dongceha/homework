const crypto = require('crypto')

module.exports = str => {
    return crypto.createHash('md5')
       .update('dc_' + str)
       .digest('hex');
}