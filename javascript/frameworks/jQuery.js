// **************************************************
// JQuery Intro
// **************************************************


// wait until document is ready
  $(document).ready(function() { });

// select an element with click handler
  $('h1').click(function() { });

// use $.get to create a callback function
// callback without arguments
  $.get( "myhtmlpage.html", myCallBack );

// callback with arguments
  $.get( "myhtmlpage.html", function() {
    myCallBack( param1, param2 );
  });

$( "h1" ).click(function() {
  $( this ).toggleClass( "test" );
});

// **************************************************
// event functions 

  alert("hi");

// **************************************************
// calls

// add a css class to html
  $( "h1" ).addClass( "test" );

// remove a css class from html
  $( "a" ).removeClass( "test" );

