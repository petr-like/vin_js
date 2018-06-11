const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Rating = new Schema({
    user: String,
    place_id: String,
    rating: {
    	type: Number,
    	min: 1,
    	max: 5
    }
});

module.exports = Rating;
