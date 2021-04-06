const express = require('express');
const ioredis = require('ioredis');
const app = express();

const redis = new ioredis({
    port: '',
    host: ''
});

const res = await redis.multi()
             .set('jack', 100)
             .set('rose', 200)
             .exec();

app.get('/drifting', async (req, res, next) => {
    // res.send('hello world');
    try {
        let {user, type = 'all'} = req.query; 
        if (!user) {
            next({error: 'user is neaded'})
        }
        const driftings = await redis.smembers('drifting');
        for (const drift_user of driftings) {
            const drift_str = await redis.hgetall(drift_user);
            const drift = JSON.parse(drift_str);
            switch (type) {
                case 'all':
                    break;
                case 'male':
                    if (drift.male !== 'male') {
                        continue;
                    }
                    break;
                case 'female':
                    if (drift.male !== 'female') {
                        continue;
                    }
                    break;
                default:
                    break;
            }
            redis.smove('drifting', drift_user);
            redis.hdel(drift_user);
            res.status(200).json({
                drifting: drift,
                code: 1,
            });
        }
    } catch (error) {
        next({
            message: error.body
        })
    }
});
app.post('/drifting', async (req, res, next) => {
    try {
        const { draft } = req.body;
        redis.sadd('drifting', draft.owner);
        redis.hset(draft.owner, JSON.stringify(draft));
        res.status(200).json({
            code: 1,
        })
    } catch (error) {
        next({
            message: '插入错误'
        })
    }
});

app.use((err, req, res, next) => {
    res.status(500).json({
        code: 0,
        msg: err.message
    })
});

app.listen(3000, () => {
    console.log('app listening at port 3000');
});
