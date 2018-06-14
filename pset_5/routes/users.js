var express = require('express');
var router = express.Router();
var Controller = require('./../controllers/Controller');
var passwordHash = require('password-hash');
var jwt    = require('jsonwebtoken'); 
var config = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cabinet', function(req,res,next){ // route to user's
	res.send('cabinet');
});

router.post('/login', function(req,res,next){ // route for login
	Controller.getOne({username: req.body.username},function(e, user){
		if(e) res.send(e);
		if(!user){
			res.sendStatus(515); //Check username
		} else if(!passwordHash.verify(req.body.password, user.password)) {
			res.sendStatus(516); // Check password
		} else {
			var payload = {id: user._id}; // Get user_id
			var token = jwt.sign(payload, config.secret); // Greate token 
			var data = {
				id : user._id,
				name : user.name,
				last_name : user.last_name,
				username : user.username
			}
			Controller.findByIdAndUpdate(data.id, {token: token}, function(e,user){ // write token to user
				if(e) console.log(e);
			});
			res.status(215).json({token: token, user: data}); //Get all information of users an save to local storage!!! DEBUG (delete hash password)
		}
	});
});

module.exports = router;