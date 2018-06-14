// google_maps_api.js

var marker, map;
var markers = [];


function initMap() {
	var uluru = {lat: 49.232791, lng: 28.469133};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: uluru
	});

	getMarker()
	// addMarkerToMap()

	google.maps.event.addListener(map, 'click', function(event) {
		if(!localStorage.user){
			alert('You can add new checkin after registration')
			$('#mymodal_register').focus()
			return
		}
		$('#btn-change').remove()
		$('#btn-add').remove()
		$('#checkinTitle').text('New checkin')
		rating_star()
		$('#checkinModal .modal-footer').append('<button id="btn-add" class="btn btn-primary type="button" onclick="add_checkin()"">Add checkin</button>')
		$('#checkinModal').modal('show');
		var a = event.latLng
		$("#cord").val(a.lat()+ ',' + a.lng())
	});
}

function add_checkin(){ // add checkin to map
	var title = $('input[name=title]')
	var description = $('textarea[name=description]')

	if (!check_input(title, description)) return

	var cord = $('#cord').val().split(',') // get cord and split

	var payload = getData(title, description)
	payload.cord = {
			lat: cord[0],
			lng: cord[1]
		}

	fetch_add_checkin(payload, '/api/addcheckin')
}

function getData(title, description, cord){
		return { // greate obj for DB
		user : JSON.parse(localStorage.user).id,
		title: title.val(),
		description: description.val(),
		rating: Number($('select[name=rating]').val()),
	}
}

function check_input(title, description){
	if(!title.val()) {
		title.addClass('input_err')
		$('.not_valid_title').text('Please enter title from your checkin')
		return false
	}else{
		title.removeClass('input_err')
		$('.not_valid_title').text('')
	}

	if(!description.val()){
		description.addClass('input_err')
		$('.not_valid_description').text('Please enter description from your checkin')
		return false
	}else{
		description.removeClass('input_err')
		$('.not_valid_description').text('')
	}
	return true
}
function fetch_add_checkin(payload, url){
	fetch(url, {
		method: 'post',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(payload)
	})
	.then((res) => res.json())
	.then(function (data){
		placeMarker(data)
	}) 
	.catch(function (err) {
		if(err) console.log('this is error',err)
	})
	$('#checkinModal').modal('hide') // hide modal window
}

function getMarker(){
	fetch('/api/all_checkins')
		.then((res) => res.json())
		.then((data) => {
			data.map((obj) => {
				placeMarker(obj)
			})
		})
		.catch(function (error) {
			if(err) console.log(err)
		})
}

function infoMarker(obj){
	marker.addListener('click', function(){
		$('#delete_checkin').remove()
		$('#change_checkin').remove()
		$('.title').text(obj.title)
		let star = '<img src="../images/star.png"/>'
		for(i = 1; i <= 4; i++){
			if(i < obj.data.rating){
				star += ' <img src="../images/star.png"/>'
			}else{
				star += ' <img src="../images/star_empty.png"/>'
			}
		}
		$('.rating').html(obj.data.rating + '' + star)
		$('.description').text(obj.data.description)
		$('#checkin_id').text(obj.data._id)
		var username = localStorage.user
		if(username){
			if(JSON.parse(username).id == obj.data.user){ // check whether checkin belongs to user
				$('#info_buttons').append('<button id="delete_checkin" class="btn btn-primary" type="button", data-toggle="modal" onclick="checkin_delete()"> Delete </button>')
				$('#info_buttons').append('<button id="change_checkin" class="btn btn-primary" type="button", data-toggle="modal" onclick="show_modal_change()"> Change </button>')
			}
		}
		show_infowindow()
	})
}

function placeMarker(location) {
	marker = new google.maps.Marker({
		position: location.cord,
		title: location.title,
		data: location,
		map: map
	})
	infoMarker(marker)
	markers.push(marker)
}

function checkin_delete(){
	var isAdmin = confirm("Are you sure you want to delete this checkin?")
	if(isAdmin) {
		var id = $('#checkin_id').text()
		fetch('/api/delete_checkin/'+id+'&'+localStorage.token)
		.then(function(data){
			if(data.status == 500 || data.status == 528){
				alert('Whats is wrong, please login again')
				close_information()
				logout()
				return
			}else if(data.status == 236){
				DeleteMarker(id)
			}
		})
		.catch(function(err){
			if(err) console.log(err)
		})
		
	}
}

function show_modal_change(){
	var title = $('input[name=title]')
	$('#btn-add').remove()
	$('#btn-change').remove()
	var description = $('textarea[name=description]')
	$('#checkinTitle').text('Change checkin')
	title.val($('#text_information .title')[0].innerHTML)
	description.val($('#information .description')[0].innerHTML)
	rating_star($('.rating')[0].innerText)
	$('#checkinModal .modal-footer').append('<button id="btn-change" class="btn btn-primary type="button" onclick="checkin_change()"">Change</button>')
	$('#checkinModal').modal('show')
}

function checkin_change(){
	var title = $('input[name=title]')
	var description = $('textarea[name=description]')
	var id = $('#checkin_id')[0].innerHTML
	DeleteMarker(id)
	if (!check_input(title, description)) return
	var payload = getData(title, description)
	fetch_add_checkin(payload, '/api/update/'+id+'&'+localStorage.token)
}

function DeleteMarker(id) {
	//Find and remove the marker from the Array
	for (var i = 0; i < markers.length; i++) {
			if (markers[i].data._id == id) {
					//Remove the marker from Map
					markers[i].setMap(null)

					//Remove the marker from array
					markers.splice(i, 1)
					close_information()
					return;
			}
	}
}

function myCheckin(){
	for(i=0; i < markers.length; i++){
		if(markers[i].data.user !== JSON.parse(localStorage.user).id ) markers[i].setMap(null)
	}
}
function showAllCheckin(){
	for(i=0; i < markers.length; i++){
		markers[i].setMap(map)
	}
}
