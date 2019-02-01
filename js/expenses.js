$.getJSON( "data/data.json", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "expenses",
    html: items.join( "" )
  }).appendTo( "body" );
});