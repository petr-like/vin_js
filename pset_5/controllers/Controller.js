var mongoose = require('mongoose');
var config = require('../config');
var test_config = require('../test');
if(process.env.TEST_ENV){
	mongoose.connect(test_config.dbHost);
	console.log('local');
} else {
	mongoose.connect(config.dbUrl);
	console.log('not local');
}
var db = mongoose.connection;
var User = require('./../Models/userSchema.js');
var Checkin = require('./../Models/checkinsSchema.js');
var userModel = db.model('users', User);
var checkinModel = db.model('checkins', Checkin);



module.exports = {
	create: function(data, callback){
		var newUser = new userModel(data);
		newUser.save(callback);
	},
	getAll: function(callback){
		userModel.find(callback);
	},
	getOneId: function(id,callback){
		userModel.findById(id, callback);
	},
	getOne: function(username,callback){
		userModel.findOne(username, callback);
	},
	findByIdAndUpdate: function(id, update, callback){
		userModel.findByIdAndUpdate(id, update, callback);
	},
	// push: function(data, callback){
	// 	userModel.
	// },
	delete: function(data, callback){
		userModel.remove(data, callback);
	},
	/////Checkin
	createCheckin: function(data, callback){
		var newCheckin = new checkinModel(data);
		newCheckin.save(callback);
	},
	getAllCheckins: function(callback){
		checkinModel.find(callback);
	},
	getOneIdCheckin: function(id,callback){
		checkinModel.findById(id, callback);
	},
	findByIdAndUpdateCheckin: function(id, update, callback){
		checkinModel.findByIdAndUpdate(id, update, callback);
	},
	deleteCheckin: function(data, callback){
		checkinModel.remove(data, callback);
	}
}