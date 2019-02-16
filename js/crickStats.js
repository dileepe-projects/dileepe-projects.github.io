var playerName = "";

$('#search').click(function(){

    playerName = $('#PlayerName').val();
    if((playerName)==="")
    {
        alert("Enter a player Name to search");
    }

    else {
        $.get('https://www.cricbuzz.com/search?q=' + playerName + "&tab=player", function(response) {
            console.log(response);
        });

    
    }

});