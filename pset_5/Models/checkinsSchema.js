const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Checkins = new Schema({
    user: String,
    title: String,
    description: String,
    rating: {
    	type: Number,
    	min: 1,
    	max: 5
    },
    cord: {
    	lat: Number,
    	lng: Number
    }
});

module.exports = Checkins;
