var fs = require('fs');
module.exports = function(data){
	fs.appendFile('users.csv',data, (err) => {
		if (err) throw err;
	});
}	