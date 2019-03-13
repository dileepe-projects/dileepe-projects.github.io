$(document).ready(function(){

    $('#format').click(function(){
        var indent = 4;
        var result = beautify($("#textarea").val(),indent);        
        $("#textarea").val(result);
    });

    $('#clear').click(function(){
        $("#textarea").val("");
    });

    $("#textarea").keypress(function(event) {
        if (event.keyCode == 13 && event.shiftKey) {
         var indent = 4;
         var result = beautify($("#textarea").val(),indent);         
         $("#textarea").val(result);
         return false;
         }
    });

    function beautify(text, indent)
    {
        var result = vkbeautify.xml(text,indent);
        return result;

    }


});

