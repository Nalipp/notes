$(function() {
  console.log('hi'); 
  $('#team li > a').on('click', function(e) {
    e.preventDefault();
    var $e = $(this);

    $e.siblings('.modal').css({
      'top': $(window).scrollTop() + 30, 
    });
    
    $e.nextAll('div').fadeIn(400);
  });

  $('.close, .modal-layer').on('click', function() {
    $('div.modal, div.modal-layer').filter(':visible').fadeOut(400);
  });
})
