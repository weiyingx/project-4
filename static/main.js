console.log('hello world');

var map;

$(document).ready(function() {
  $('.special.cards .image').dimmer({
    on: 'hover'
  });
  $('.ui.dropdown')
  .dropdown()
  ;
  $('.ui.form')
  .form({
    fields: {
      name     : 'empty',
      gender   : 'empty',
      username : 'empty',
      password : ['minLength[6]', 'empty'],
      skills   : ['minCount[2]', 'empty'],
      terms    : 'checked'
    }
  });
  $('.ui.checkbox')
  .checkbox()
  ;


  $('a').click(function(){
    $('html, body').animate({
      scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
  });


})


function initMap() {
  var tioman = {lat: 2.7902, lng: 104.1698};
  var besar = {lat: 2.4380, lng: 103.9811};
  var mersing = {lat: 2.4309, lng: 103.8361};
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 2.1309, lng: 103.8361},
    zoom: 8
  });

  var contentString = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h4 id="firstHeading" class="firstHeading">Tioman Island</h4>'+
  '<div id="bodyContent">'+
  '<p><b>Sea Transfer Duration:</b> 2 Hours</p>'+
  '<p><b>Depart From:</b> Mersing Ferry Terminal</p>'+
  '</div>'+
  '</div>';

  var contentString1 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h4 id="firstHeading" class="firstHeading">Pulau Besar</h4>'+
  '<div id="bodyContent">'+
  '<p><b>Sea Transfer Duration:</b> 30 Mins</p>'+
  '<p><b>Depart From:</b> Mersing Ferry Terminal</p>'+
  '</div>'+
  '</div>';

  var contentString2 = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h4 id="firstHeading" class="firstHeading">Mersing Ferry Terminal</h4>'+
  '<div id="bodyContent">'+
  '<p><b>Journey Time From Singapore:</b> 2 Hours after Customs</p>'+
  '</div>'+
  '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var infowindow1 = new google.maps.InfoWindow({
    content: contentString1
  });

  var infowindow2 = new google.maps.InfoWindow({
    content: contentString2
  });

  var marker = new google.maps.Marker({
    position: tioman,
    map: map
  });
  var marker1 = new google.maps.Marker({
    position: besar,
    map: map
  });
  
  var marker2 = new google.maps.Marker({
    position: mersing,
    map: map
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  marker1.addListener('click', function() {
    infowindow1.open(map, marker1);
  });
  marker2.addListener('click', function() {
    infowindow2.open(map, marker2);
  });
}
