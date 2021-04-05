document.getElementById("submit").onclick = function() {
    
    //check for empty fields
    if ( document.getElementById("name").value == ""||document.getElementById("mobile").value == ""||document.getElementById("email").value == "")
    {       
        document.getElementById("error").style.display = "block";
    }
    else{
        document.getElementById("error").style.display = "none";       
    }


};

