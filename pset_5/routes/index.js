var express = require('express');
var router = express.Router();
// var UserController = require('./../controllers/UserController')
var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.dbUrl);
var db = mongoose.connection;
var UserController = require('./../controllers/UserController');
var User = require('./../Models/userSchema.js');
var userModel = db.model('users', User);
var jwt    = require('jsonwebtoken'); 
// var checkinModel = db.model('checkins', Checkin);
// var Checkin = require('./../Models/checkinsSchema.js');

console.log(mongoose.connection.readyState);


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/api/auth', function(req, res, next) {
	
});

router.get('/checkins', function(req, res, next) {
	
});


module.exports = router;
