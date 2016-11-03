console.log('hello world');


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
// $('.order-button').click(function(){
//     $('.modaldiv').modal('show');
// });

})
