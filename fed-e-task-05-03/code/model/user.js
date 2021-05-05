const mongoose = require('mongoose');
const md5 = require('../util/md5');
const baseModule = require('./base.module')
const userSchema = new mongoose.Schema({
    ...baseModule,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        set: value => md5(value),
        select: false,
    },
    bio: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    
});

module.exports = userSchema;
