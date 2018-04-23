var fs = require('fs');
module.exports = function(data){
	return fs.readFileSync('users.csv').toString().split("\n").length-1;
}	