const mongoose = require('mongoose');
const {dbUri} = require('../config/config.default')
// 连接 mongoDB 数据库
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on('error', error => {
    console.log('MongoDB 数据库连接失败', error);
});
db.once('open', function() {
    console.log('MongoDB 数据库成功');
});

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

// 组织导出模型类

module.exports = {
    User: mongoose.model('User', require('./user')),
    Article: mongoose.model('Article', require('./article')),
}
