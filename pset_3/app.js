var fs = require('fs');
module.exports = function(data ){
	fs.appendFile('log/log.txt', data  +'\n', function (err) {
		if (err) 
			return console.log(err);
		console.log('Success');
	});
}