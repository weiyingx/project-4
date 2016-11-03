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

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

})
