const mongoose = require('mongoose');
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
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token:{
        type: String,
        default: ''
    }
});


module.exports = User;
