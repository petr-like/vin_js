var express = require('express');
var router = express.Router();
var UserController = require('./../controllers/UserController');
var passwordHash = require('password-hash');
var jwt    = require('jsonwebtoken'); 
var config = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cabinet', function(req,res,next){
	res.render('cabinet');
});
router.get('/login', function(req,res,next){
	res.render('login');
});

router.post('/add', function(req, res, next) {
	UserController.getOne({twitter_name: req.body.twitter_name},function(e, user){
		if(e) res.send(e);
		if(user.length == 0){
			var data = {
				name: req.body.name,
				last_name: req.body.last_name,
				twitter_name: req.body.twitter_name,
				password: passwordHash.generate(req.body.password)
			};
			UserController.create(data, function(error, user){
				if (error){
					res.send(error);
				}else{
					console.log('Succ');
					res.render('register');
				}
			});
		} else {
			res.send('Такой пользователь уже существует')
		}
	});
});

router.post('/cabinet', function(req,res,next){
	UserController.getOne({twitter_name: req.body.twitter_name_login},function(e, user){
		if(e) res.send(e);
		if(user.length == 0){
			res.render('login', {error:'Username you’ve entered doesn’t match any account'});
		} else if(!passwordHash.verify(req.body.password_login, user[0].password)) {
			res.render('login',{error:'Password incorect'});
		} else {
			var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
			console.log(token);
			res.render('cabinet');
		}
	});
});
module.exports = router;
