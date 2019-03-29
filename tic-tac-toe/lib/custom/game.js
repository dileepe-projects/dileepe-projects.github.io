 
    $( document ).ready(function() {
       $('td').click(function(){  
        var current_symbol = sessionStorage.getItem("current_symbol");         
        if($(this).attr("completed")=="true") { }        
        else  nextTurn(this,current_symbol);
       });
    });
     
     $(window).on('load', function(){ 

        $('#playerOptions').modal('show');
    });

    $("#start").click(function(){

        var player1= $("#player1").text();
        var player2=$('#player2').text();
        
        if (typeof(Storage) !== "undefined") {
            // Store
            sessionStorage.setItem("player1_name", player1);
            sessionStorage.setItem("player2_name", player2);
            sessionStorage.setItem("current_player", player1)
            sessionStorage.setItem("current_symbol", "X");
            // Retrieve
            $('#playerOptions').modal('hide');
            $('#gameArea').show();            
            setPlayerTurn(sessionStorage.getItem("current_player"),sessionStorage.getItem("current_symbol") );
            
          } else {
           alert("Sorry, your browser does not support Web Storage...");
          }

    });

   

    function nextTurn(currentValue,current_symbol){
        var player1 = sessionStorage.getItem("player1_name");
        var player2 = sessionStorage.getItem("player2_name");       
        if(current_symbol=="X")
        {
            $(currentValue).text("X");  
            setPlayerTurn(player2, "O");           
            $(currentValue).attr("completed","true");
        }   
        else{
            $(currentValue).text("O");  
            setPlayerTurn(player1, "X"); 
            $(currentValue).attr("completed","true");
        }    
       

       
    }

    function setPlayerTurn(current_player, current_symbol)
    {
        
        
        sessionStorage.setItem("current_player", current_player);
        sessionStorage.setItem("current_symbol", current_symbol);
       
        $("#currentPlayer").text(current_player);
        $("#currentSymbol").text(current_symbol);
    }

    
    
    