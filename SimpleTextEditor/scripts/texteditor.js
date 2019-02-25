var data = "";
var fileName = "";




$( document ).ready(function() {  
  var storedDraft = localStorage.getItem('draftFile'); 
   if(!(JSON.parse(storedDraft) == null))
     {
      $('#textfilename').val(JSON.parse(storedDraft)[0].fileName)  ;
      $('#textfiledata').val(JSON.parse(storedDraft)[0].fileData)  ;
     }  

     // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList) {
      

        $('#fileinput').change(function(evt){
        readSingleFile(evt);
          }); 

         $( "#openFile" ).click(function() {
          $('#fileinput').trigger( "click" );
        });

            
    } else {
      $( "#openFile" ).prop( "disabled", true );
    }

});


var readSingleFile = (function(){
//Retrieve the first (and only!) File from the FileList object

 return function (evt){
    var f = evt.target.files[0]; 

     if (!f) {
        $('#errmsg').text("Failed to load file");         
        } else if (!f.type.match('text.*')) {
         $('#errmsg').text(f.name + " is not a valid text file.");       
        } 
        else {
      var r = new FileReader();
      r.onload = function(e) { 
        var contents = e.target.result;
        var loadedfilename = f.name.split('.txt');
        $('#textfiledata').val(contents);
        $('#textfilename').val(loadedfilename[0]);  
        $('#errmsg').text("");
      }
      r.readAsText(f);
    }    
  };
}());



var updateLocalStorage = (function (){
    return function (data, fileName){
  var draftFile = [{"fileName": fileName, "fileData": data}];
  if (!window.localStorage) {    
      }
    else {
      localStorage.setItem('draftFile', JSON.stringify(draftFile));
      $('#messagetext').text("Draft saved at " + moment().format('MMMM Do YYYY, h:mm a'));    
      }   
  };
  }());



var downloadData = (function () {
    
    return function (data, fileName) {
      //check if browser is IE

    var ms_ie = false;
    var ua = window.navigator.userAgent;
    var msie_ie = ua.indexOf('MSIE ');
    var trident_ie = ua.indexOf('Trident/');
    var edge_ie = ua.indexOf('Edge/');
    
    
    
    if ((msie_ie > -1) || (trident_ie > -1)) {
        ms_ie = true;
    }
    if ( ms_ie ) {
      
        if (!window.navigator.msSaveBlob) {
        $('#errmsg').text("Download Option Not supported!");
        } // if 
       
       var blobAsTxtFile = new Blob([data], {
          type: 'text/plain'
          });         
          window.navigator.msSaveBlob(blobAsTxtFile, fileName);
    }

      else {
        $('body').append('<a id="filedownload">');
        $('#filedownload').attr("style", "display: none");        
        var blob = new Blob([data], {type: "octet/stream"}),
          url = window.URL.createObjectURL(blob);
          $('#filedownload').attr("href", url); 
          $('#filedownload').attr("download", fileName); 
            $( "#filedownload" )[0].click();           

            //In firefox the url object is getting revoked quicker, so setting timeout as workaround. 
            setTimeout(function(){
            $("#filedownload").remove();            
            window.URL.revokeObjectURL(url);  
        }, 0); 

      }      
        
    };
}());





$('#downloadDraft').click(function() {
      data = $('#textfiledata').val();
      fileName = $('#textfilename').val()+".txt";
      if(!fileName == "" && ! data == "")
      {
        downloadData(data, fileName);
        updateLocalStorage(data, fileName);       
      }
      
});





$('#saveDraft').click(function() {
data = $('#textfiledata').val();
fileName = $('#textfilename').val();
  if(!fileName == "" && ! data == "")
      {
        updateLocalStorage(data, fileName);       
      }
});

$('#clearTextArea').click(function() {
  $('#textfiledata').val("");
});

$('#newDraft').click(function() {
  $('#textfiledata').val("");
  $('#textfilename').val("");
});


$('#clearDraft').click(function() {
  $('#textfiledata').val("");
  $('#textfilename').val("");
  localStorage.removeItem("draftFile");
  $('#messagetext').text("");  
});



setInterval(function(){ 
data = $('#textfiledata').val();
fileName = $('#textfilename').val();
  if(!fileName == "" && ! data == "")
      {
        updateLocalStorage(data, fileName);       
      } 
}, 1000*180); //3 minutes autosave
