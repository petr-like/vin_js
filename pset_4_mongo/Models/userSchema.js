const mongoose = require('mongoose');
const autoincrement = require('simple-mongoose-autoincrement');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    twitter_name: {
        type: String,
        required: true
    }
}, { versionKey: false});

User.plugin(autoincrement, {field: 'user_id'});

module.exports = User;
