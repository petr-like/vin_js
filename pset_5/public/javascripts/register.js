// register.js

export function register() {
	var input_name = $('input[name=name]');
	var input_last_name = $('input[name=last_name]');
	var input_username = $('input[name=username]');
	var input_pass = $('input[name=password]');
	var input_pass_conf = $('input[name=password_confirmate]');
	var check = true;

	var payload = {
		name: input_name.val(),
		last_name: input_last_name.val(),
		username: input_username.val(),
		password:input_pass.val()
	}
	// Check input name
	if(!payload.name){ 
		input_name.addClass('input_err')
		$('.not_valid_name').text('Please enter your name')
		check = false;
	}else{
		input_name.removeClass('input_err')
		$('.not_valid_name').text('')
	}
	// Check input last name
	if(!payload.last_name){
		input_last_name.addClass('input_err')
		$('.not_valid_last_name').text('Please enter your last name')
		check = false;
	}else{
		input_last_name.removeClass('input_err')
		$('.not_valid_last_name').text('')
	}
	// Check input username
	if(!payload.username){
		input_username.addClass('input_err')
		$('.not_valid_username').text('Please chose username')
		check = false;
	}else{
		input_username.removeClass('input_err')
		$('.not_valid_username').text('')
	}
	// Check input password
	if(!payload.password){
		input_pass.addClass('input_err')
		$('.not_valid_password').text('Create your password')
		check = false;
	}else{
		input_pass.removeClass('input_err')
		$('.not_valid_password').text('')
	}
	// Check input pass_conf
	if(!input_pass_conf.val()){
		input_pass_conf.addClass('input_err')
		$('.not_valid_pass_conf').text('Please enter your password again')
		check = false;
	}else{
		input_pass_conf.removeClass('input_err')
		$('.not_valid_pass_conf').text('')
	}

	if(payload.password !== input_pass_conf.val()){
		input_pass_conf.addClass('input_err')
		$('.not_valid_pass_conf').text('The confirmation password is different')
		check = false;
	}
	if(!check){
		console.log('not fetch')
		return;
	}
	// Fetch post to add user
	fetch('/api/add', {  
    method: 'post',  
    headers: {  
      "Content-type": "application/json"  
    },  
    body: JSON.stringify(payload)
  })
  .then(function (data) {
    if(data.status == 506){
    	$('.success').text('Username already exists').css('color', 'red')
    	$('input[name=username]').focus()
    }
    if(data.status == 206){
    	$('.success').text('Thanks for register, we redirect you to new page').css('color', 'green')
    }
  })  
  .catch(function (error) {  
    console.log('Request failed', error);	
  });
}