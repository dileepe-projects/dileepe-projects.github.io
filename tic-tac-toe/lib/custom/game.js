
 


//show popup on start/load
$(window).on('load', function(){ 
    $('#playerOptions').modal('show');
});
    
    
$( document ).ready(function() {
      
       
       
       $('td').click(function(){  
        var current_symbol = sessionStorage.getItem("current_symbol");         
        if($(this).attr("completed")=="true") { }        
        //play turn only when clicked on non empty box
        else  {
                nextTurn(this,current_symbol);
                
            }
       });
});     
    
//start game
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
            setPlayerTurn(sessionStorage.getItem("current_player"),sessionStorage.getItem("current_symbol"), sessionStorage.getItem("player2_name"));
            
          } else {
           alert("Sorry, your browser does not support Web Storage...");
          }

});

   

function nextTurn(currentValue,current_symbol){
        var player1 = sessionStorage.getItem("player1_name");
        var player2 = sessionStorage.getItem("player2_name"); 
        var won = "";
        switch (current_symbol)
        {
            case "X": {
                $(currentValue).text("X");  
               
                setPlayerTurn(player2, "O", player1);           
                $(currentValue).attr("completed","true");
                won = checkHorizontal();
                if(!won) { won = checkVertical();}
                if(!won) { won = checkDiagonal();}
                
                break;
            }
            case "O": {
                $(currentValue).text("O");  
               
                setPlayerTurn(player1, "X", player2); 
                $(currentValue).attr("completed","true");
                won = checkHorizontal();
                if(!won) { won = checkVertical();}
                if(!won) { won = checkDiagonal();}
                break;
            }
        }  
        
       /* logic.horizontal.forEach(function(item) {
            Object.keys(item).forEach(function(key) {                
                var arr = item[key];
                for (var z = 0; z < arr.length; z++) {
                    console.log( arr[z]);
                }
            });
        }); */
          
       
    }

function setPlayerTurn(current_player, current_symbol, opp) {
        
        
        sessionStorage.setItem("current_player", current_player);
        sessionStorage.setItem("current_symbol", current_symbol);
       
        $("#currentPlayer").text(current_player);
        $("#currentSymbol").text(current_symbol);
        $('#currentPlayer').attr("opp",opp)
    }


function checkHorizontal(){

    //horizontal
    var one = $("#1").text();
    var two = $("#2").text();
    var three = $("#3").text();
    var four = $("#4").text();
    var five = $("#5").text();
    var six = $("#6").text();
    var seven = $("#7").text();
    var eight = $("#8").text();
    var nine = $("#9").text();
    if(one==""||two==""||three==""){}
    else{
        if(one==two&&two==three)
        {
             $("game").attr("status","completed");
             $("#1").css("text-decoration","line-through");
             $("#2").css("text-decoration","line-through");
             $("#3").css("text-decoration","line-through");
             $("#winner").text($("#currentPlayer").attr("opp"));
             $("td").unbind(); //remove click event
             $("#playDiv").hide();
             $("#winDiv").show();
             return true;
        }
        else{}
    }   
    if(four==""||five==""||six==""){}
    else{
        if(four==five&&five==six)
        {          
             $("game").attr("status","completed");
             $("#4").css("text-decoration","line-through");
             $("#5").css("text-decoration","line-through");
             $("#6").css("text-decoration","line-through");
             $("#winner").text($("#currentPlayer").attr("opp"));
             $("td").unbind(); //remove click event
             $("#playDiv").hide();
             $("#winDiv").hide();
             return true;
        }
        else{}
    }   
    if(seven==""||eight==""||nine==""){}
    else{
        if(seven==eight&&eight==nine)
        {          
             $("game").attr("status","completed");
             $("#7").css("text-decoration","line-through");
             $("#8").css("text-decoration","line-through");
             $("#9").css("text-decoration","line-through");
             $("#winner").text($("#currentPlayer").attr("opp"));
             $("td").unbind(); //remove click event
             $("#playDiv").hide();
             $("#winDiv").show();
             return true;
        }
        else{}
    }
    

}

function checkVertical(){

    //vertical
    var one = $("#1").text();
    var two = $("#2").text();
    var three = $("#3").text();
    var four = $("#4").text();
    var five = $("#5").text();
    var six = $("#6").text();
    var seven = $("#7").text();
    var eight = $("#8").text();
    var nine = $("#9").text();
    if(one==""||four==""||seven==""){}
    else{
        if(one==four&&four==seven)
        {
             $("game").attr("status","completed");
             $("#1").css("text-decoration","line-through");
             $("#4").css("text-decoration","line-through");
             $("#7").css("text-decoration","line-through");
             $("#winner").text($("#currentPlayer").attr("opp"));
             $("td").unbind(); //remove click event
             $("#playDiv").hide();
             $("#winDiv").show();
             return true;
        }
        else{}
    }   
    if(two==""||five==""||eight==""){}
    else{
        if(two==five&&five==eight)
        {          
             $("game").attr("status","completed");
             $("#2").css("text-decoration","line-through");
             $("#5").css("text-decoration","line-through");
             $("#8").css("text-decoration","line-through");
             $("#winner").text($("#currentPlayer").attr("opp"));
             $("td").unbind(); //remove click event
             $("#playDiv").hide();
             $("#winDiv").show();
             return true;
        }
        else{}
    }   
    if(three==""||six==""||nine==""){}
    else{
        if(three==six&&six==nine)
        {          
             $("game").attr("status","completed");
             $("#3").css("text-decoration","line-through");
             $("#6").css("text-decoration","line-through");
             $("#9").css("text-decoration","line-through");
             $("#winner").text($("#currentPlayer").attr("opp"));
             $("td").unbind(); //remove click event
             $("#playDiv").hide();
             $("#winDiv").show();
             return true;
        }
        else{}
    }
    

}

function checkDiagonal(){

    //diagonal
    var one = $("#1").text();
    var two = $("#2").text();
    var three = $("#3").text();
    var four = $("#4").text();
    var five = $("#5").text();
    var six = $("#6").text();
    var seven = $("#7").text();
    var eight = $("#8").text();
    var nine = $("#9").text();
    if(one==""||five==""||nine==""){}
    else{
        if(one==five&&five==nine)
        {
             $("game").attr("status","completed");
             $("#1").css("text-decoration","line-through");
             $("#5").css("text-decoration","line-through");
             $("#9").css("text-decoration","line-through");
             $("#winner").text($("#currentPlayer").attr("opp"));
             $("td").unbind(); //remove click event
             $("#playDiv").hide();
             $("#winDiv").show();
             return true;
        }
        else{}
    }   
    if(three==""||five==""||seven==""){}
    else{
        if(three==five&&five==seven)
        {          
             $("game").attr("status","completed");
             $("#3").css("text-decoration","line-through");
             $("#5").css("text-decoration","line-through");
             $("#7").css("text-decoration","line-through");
             $("#winner").text($("#currentPlayer").attr("opp"));
             $("td").unbind(); //remove click event
             $("#playDiv").hide();
             $("#winDiv").show();
             return true;
        }
        else{}
    }   
}

    