var fs = require('fs');
module.exports = function(){
	var lines = fs.readFileSync('users.csv').toString().split("\n");
	var lines2 = [];
	for(var i = 0; i <= lines.length-2; i++)
		{
			var lines3 = lines[i].split(";");
			lines2[i] = {
				id:lines3[0],
				firstName: lines3[1],
				secondName:lines3[2],
				twitterName:lines3[3]
			}
		}	
	return lines2;
};