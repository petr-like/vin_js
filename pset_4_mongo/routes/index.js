var express = require('express');
var router = express.Router();
var twitter = require('twitter');
var config = require('../config');
var client = new twitter(config.twitter);
const User = require('./../Models/userSchema.js');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://User2:test@myfirstdb-xzy6l.mongodb.net/people");
const db = mongoose.connection;
const userModel = db.model('form_register', User);
console.log(mongoose.connection.readyState);

/* GET home page. */
router.get('/', function(req, res, next) {
	userModel.find({}, function (err, users) {
		res.render('index', { users: users});
	});

});

router.get('/users/add', function(req, res, next) {
	res.render('add');
});

router.post('/register', function(req, res, next) {
	const newUser = new userModel();
	userModel.create({name: req.body.firstName, last_name: req.body.lastName, twitter_name: req.body.userNameTwitter}, function (err, users) {
		client.post('statuses/update', {status: 'Hello, ' + users.name + ' ' + users.last_name + ', ' + users.twitter_name + '.  Your id is ' + users.user_id},  function(error, tweet, response) {
			if(error) throw error;
		});
		res.render('register');
	});

});


module.exports = router;