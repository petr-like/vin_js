let mymodal = '<button id="mymodal" class="btn btn-primary" type="button", data-toggle="modal", data-target="#logInModal"> Log in </button>'
let mymodal_register = '<button id="mymodal_register"class="btn btn-primary" type="button", data-toggle="modal", data-target="#registerModal"> Register </button>'
let logout_button = '<button id="logout" class="btn btn-primary" type="button" onclick="logout()"> Log out </button>'
let cabinet_button = '<button id="cabinet" class="btn btn-primary" type="button" onclick="show_cabinet()"> My cabinet </button>'
let widthMap;
$('#mymodal').trigger('click') // event to click on button login
$('#mymodal_register').trigger('click') // event to click on button register

$(document).ready(function(){
	user_is_login() // проверить есть ли в памяти браузера юзер
	$("#text_information span").click(()=> close_information())
	$("#cabinet_window span").click(()=> close_cabinet())
	widthMap = $('#map').width()
	if(document.body.clientHeight < document.body.scrollHeight) widthMap+= 16 // add 16px for monitor if body height more height document
});

function close_information(){
	$('#map').width(widthMap)
	$('#information').width(0) // hide info window
	$('#information').css('display', 'none')
	$('#buttons').css('right', '2%')
}

function close_cabinet(){
	$('#map').width(widthMap)
	$('#cabinet_window').width(0) // hide info window
	$('#cabinet_window').css('display', 'none')
	$('#buttons').css('right', '2%')

}

function show_cabinet(){
	close_information()
	$('#cabinet_window').css('display', 'block')
	$('#map').width(widthMap*0.75)
	$('#cabinet_window').width(widthMap*0.25)
	$('#buttons').css('right', widthMap*0.27)
}

function show_infowindow(){
	close_cabinet()
	$('#information').css('display', 'block')
	$('#map').width(widthMap*0.75)
	$('#information').width(widthMap*0.25)
	$('#buttons').css('right', widthMap*0.27)
}

function register() {
	var input_name = $('input[name=name]')
	var input_last_name = $('input[name=last_name]')
	var input_username = $('input[name=username]')
	var input_pass = $('input[name=password]')
	var input_pass_conf = $('input[name=password_confirmate]')
	var check = true

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
		check = false
	}else{
		input_name.removeClass('input_err')
		$('.not_valid_name').text('')
	}
	// Check input last name
	if(!payload.last_name){
		input_last_name.addClass('input_err')
		$('.not_valid_last_name').text('Please enter your last name')
		check = false
	}else{
		input_last_name.removeClass('input_err')
		$('.not_valid_last_name').text('')
	}
	// Check input username
	if(!payload.username){
		input_username.addClass('input_err')
		$('.not_valid_username').text('Please chose username')
		check = false
	}else{
		input_username.removeClass('input_err')
		$('.not_valid_username').text('')
	}
	// Check input password
	if(!payload.password){
		input_pass.addClass('input_err')
		$('.not_valid_password').text('Create your password')
		check = false
	}else{
		input_pass.removeClass('input_err')
		$('.not_valid_password').text('')
	}
	// Check input pass_conf
	if(!input_pass_conf.val()){
		input_pass_conf.addClass('input_err')
		$('.not_valid_pass_conf').text('Please enter your password again')
		check = false
	}else{
		input_pass_conf.removeClass('input_err')
		$('.not_valid_pass_conf').text('')
	}

	if(payload.password !== input_pass_conf.val()){
		input_pass_conf.addClass('input_err')
		$('.not_valid_pass_conf').text('The confirmation password is different')
		check = false
	}
	if(!check){
		return
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
			login(input_username, input_pass)
			$('#registerModal').modal('hide') // hide modal window
		}
	})  
	.catch(function (error) {  
		console.log('Request failed', error)
	})
}


function login(login, password){
	var check = true;

	if(!login.val()){
		login.addClass('input_err')
		$('.not_valid_login').text('Please enter yout username')
		check = false
	}else{
		login.removeClass('input_err')
		$('.not_valid_login').text('')
	}

	if(!password.val()){
		password.addClass('input_err')
		$('.not_valid_login_password').text('Please enter yout password')
		check = false
	}else{
		password.removeClass('input_err')
		$('.not_valid_login_password').text('')
	}
	if(!check) return

	var payload = {
		 username : login.val(),
		 password : password.val()
	}

	// Fetch post to add user
	fetch('/users/login', {
		method: 'post',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(payload)
	})
	.then((res) => res.json())
	.then(function (response) {
		if(response == 515){
			$('.success_log').text('Username not found').css('color', 'red')
			$('input[name=login]').focus()
			return
		}
		if(response == 516){
			$('.success_log').text('Passwrod wrong').css('color', 'red')
			$('input[name=login_password]').focus()
			return
		}else{
			localStorage.setItem('token', response.token);
			localStorage.setItem('user', JSON.stringify(response.user));
			$('#logInModal').modal('hide')
			$('#mymodal').remove()
			$('#mymodal_register').remove()
			user_is_login()
		}
	})  
	.catch(function (error) {  
		console.log('Request failed', error)
	})
}


function user_is_login(){ // проверка авторизирован ли пользователь
	if(localStorage.user) {
		$('#buttons').append(logout_button)
		$('#buttons').append(cabinet_button)
		var username = JSON.parse(localStorage.user);
		$('.hello').text('Hello ' + username.name + ' ' + username.last_name)
	}else{
		$('#buttons').append(mymodal)
		$('#buttons').append(mymodal_register)
		$('.hello').text('Hello guest')
	}
}

function logout(){ // Выход очистить память и вернуть кнопки обратно
	var isAdmin = confirm("Are you sure you want to logout?")
	if(isAdmin) {
		localStorage.clear()
		$('#logout').remove()
		$('#cabinet').remove()
		$('#buttons').append(mymodal)
		$('#buttons').append(mymodal_register)
		$('.hello').text('Hello guest')
	}
}

function change_password(){

}

