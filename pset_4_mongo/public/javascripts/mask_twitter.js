var twitter_name = document.getElementById("twitter_name");
function isValidForm()
{
	if(!/^@/.test(twitter_name.value)){
		alert("Twitter name must begin chapter '@'");
		return false;
	}
}