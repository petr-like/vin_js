var express = require('express');
var router = express.Router();
const config = require('../config.json');
const mongoose = require('mongoose');
const User = require('./../Models/userSchema.js');
const Checkin = require('./../Models/checkinsSchema.js');
mongoose.connect("mongodb+srv://User3:test@brainbasketcheckin-h7hkk.mongodb.net/checkin");
const db = mongoose.connection;
const userModel = db.model('test_users', User);
const checkinModel = db.model('checkins', Checkin);
console.log(mongoose.connection.readyState);


/* GET home page. */
router.get('/', function(req, res, next) {
  const newCheckin = new checkinModel();
  checkinModel.find({}, function (err, checkins) {
    res.render('index', {checkins: checkins});
  });
});

router.get('/checkins', function(req, res, next) {
    checkinModel.find({}, function (err, checkins) {
    res.send(checkins);
  });
});


module.exports = router;