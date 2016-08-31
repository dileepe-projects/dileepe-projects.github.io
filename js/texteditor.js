var data = "";
var fileName = "";




$( document ).ready(function() {  
  var storedDraft = localStorage.getItem('draftFile'); 
   if(!(JSON.parse(storedDraft) == null))
     {
      $('#textfilename').val(JSON.parse(storedDraft)[0].fileName)  ;
      $('#textfiledata').val(JSON.parse(storedDraft)[0].fileData)  ;
     }     
});



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
    
    
    
    if ((msie_ie > -1) || (trident_ie > -1) || (edge_ie > -1)) {
        ms_ie = true;
    }
    if ( ms_ie ) {
       $('#userAgent').text("Downloading From IE!");
       var blobAsTxtFile = new Blob([data], {
		    	type: 'text/plain'
		  	  });    			
   			  window.navigator.msSaveBlob(blobAsTxtFile, fileName);
    }


      /*var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
      ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
      ieEDGE = navigator.userAgent.match(/Edge/g),
      ieVer=(ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));
      
      if (ieVer>-1) {
      		  //if IE then use window navigator to save text file as BLOB is not supported
		      var blobAsTxtFile = new Blob([data], {
		    	type: 'text/plain'
		  	  });    			
   			  window.navigator.msSaveBlob(blobAsTxtFile, fileName);

  		}*/

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
			fileName = $('#textfilename').val();
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
