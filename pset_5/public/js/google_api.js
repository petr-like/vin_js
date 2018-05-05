var map;
var url = 'http://localhost:3000/checkins';
function initMap() {
  // var checkins = [#{checkins}];
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:49.2251861, lng: 28.4141082},
    zoom: 14
  });
}
fetch(url)
.then((resp) => resp.json())
.then(function(data){
  data.map((checkin) => new google.maps.Marker({
    position: checkin.cord,
    map: map,
    title: checkin.place
  }));
})
.catch(function(error) {
  console.log('err');
});