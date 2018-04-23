var express = require('express');
var router = express.Router();
var twitter = require('twitter');
var file = require('./file');
var id_user = require('./id_user');
var config = require('../config');
var client = new twitter(config.twitter);
var users_register = require('./users_register');


/* GET  page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express', lines: users_register()});
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add', function(req, res, next) {
  res.render('register');
  var id = id_user();
  client.post('statuses/update', {status: 'Hello, ' + req.body.firstName + ' ' + req.body.lastName + ', ' + req.body.userNameTwitter + '.  Your id is ' + id},  function(error, tweet, response) {
	  if(error) throw error;
	});
  file(id + ';' +req.body.firstName + ';' + req.body.lastName + ';'  + req.body.userNameTwitter + ';\n');

});


module.exports = router;
