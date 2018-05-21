var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.dbUrl);
var db = mongoose.connection;
var User = require('./../Models/userSchema.js');
var Checkin = require('./../Models/checkinsSchema.js');
var userModel = db.model('Users', User);
var checkinModel = db.model('checkins', Checkin);

console.log(mongoose.connection.readyState);

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
	getOne: function(t_name,callback){
		userModel.find(t_name, callback);
	},
	delete: function(data){

	}
}