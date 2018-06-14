	// api.js
var express = require('express');
var router = express.Router();
var Controller = require('./../controllers/Controller');
var passwordHash = require('password-hash');
var jwt    = require('jsonwebtoken'); 
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res) {
	res.json({message: 'This page from API'})
});

router.post('/add', function(req, res, next) {
	Controller.getOne({username: req.body.username},function(e, user){
		if(e) res.send(e);
		if(!user){ // if not user, greate
			var data = {
				name: req.body.name,
				last_name: req.body.last_name,
				username: req.body.username,
				password: passwordHash.generate(req.body.password)
			};
			Controller.create(data, function(error, user){
				if (e){
					res.send(e);
				}else{
					res.send(206, 'register');
				}
			})
		} else {
			res.send(506, 'Username taken') // send error
		}
	});
});

router.get('/all_users', function(req, res) {
	Controller.getAll(function(err, users){
		if(err) res.send(err);
		res.send(users);
	});
});


router.post('/addcheckin', function(req, res, next) {
	console.log(req.body)
	var data = {
		user: req.body.user,
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
    cord: req.body.cord
	}
	Controller.createCheckin(data, function(err, checkin){
		if(err) res.send(err);
		res.send(checkin);
	})
});

router.get('/all_checkins', function(req, res) {
	Controller.getAllCheckins(function(err, checkins){
		if(err) res.send(err);
		res.send(checkins);
	});
});

router.get('/delete_checkin/:id&:token', function(req, res){
	let id = {_id: req.params.id}
	let token = req.params.token
	let decoded = jwt.verify(token, config.secret)
	Controller.getOneId(decoded.id, function(err,user){
		if(err) 	console.log(err)
		if(user.token == token){
			Controller.deleteCheckin(id, function(err, checkin){
				if(err) console.log('Not delete checkin', err);
				res.sendStatus(236)
			})
		}else{
			res.sendStatus(528)
		}
	})
});

router.post('/update/:id&:token', function(req, res){
	let id = {_id: req.params.id}
	let token = req.params.token
	let decoded = jwt.verify(token, config.secret)
	let payload = req.body
	Controller.getOneId(decoded.id, function(err,user){
		if(err) 	console.log(err)
		if(user.token == token){
			Controller.findByIdAndUpdateCheckin(id, {$set:payload}, function(e,checkin){
				if(e) console.log(e)
				Controller.getOneIdCheckin(id,function(e,checkin){
					if(e) console.log(e)
					res.send(checkin)
				})
			})
		}else{
			res.sendStatus(528)
		}
	})
})

module.exports = router;