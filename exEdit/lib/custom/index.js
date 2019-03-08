$(document).ready(function(){
    $("#selectFile").click(function(){       
        $("#fileUpload").trigger("click");
            
        $("#fileUpload").change(function(e){
            var fileName = e.target.files[0].name;
            var fileSize = e.target.files[0].size;
           
            
            $("#fname").text(fileName);
            $("#fsize").text(fileSize + " Bytes");
            $("#fstatus").text("Not Uploaded");
            $("#search").hide();
            $("#searchOpt").empty();

            $("#selectFile").text("1 File Selected");
            $("#selectFile").attr('class', 'btn btn-success my-2 my-sm-0 spaced');

           
        });
    });

    $("#upload").click(function(){
        Upload();
    });
});

function Upload() {
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");            
            
        }
    } else {
        alert("Please upload a valid Excel file.");        
        
    }
};
function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet],{header:1});
    var headerRows = excelRows[0];
    
    

     //Create a HTML Table element.
     var table = document.createElement("table");
     table.setAttribute("Id","myTable");
     table.border = "1";
     var thead = document.createElement("thead");
     table.appendChild(thead);
     //Add the header row.
     var row = thead.insertRow(-1);

    for(var i=0; i<headerRows.length; i++)
    {
         //Add the header cells.
        var headerCell = document.createElement("Th");
        headerCell.innerHTML = headerRows[i];        
        row.appendChild(headerCell);
       
    }

    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    
    for (var j = 1; j < excelRows.length; j++) {

       
       var row = tbody.insertRow(-1);
      
       for(var k=0; k<excelRows[j].length; k++)
       {
        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[j][k];
       }

        
    }

    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(table);
   //$('#myTable').DataTable();
   $("#fstatus").text("Uploaded");
   //$("#search").show();
   
   $('table').SetEditable();
   
   setSearchIndex(headerRows);
    
};

function setSearchIndex(searchOptions){  
    
    for(var i=0; i<searchOptions.length; i++)
    {
        $("#searchOpt").append("<option value='"+i+"'>"+searchOptions[i]+"</options>")
      
    }
    $("#search").css("display","flex");

}


function searchTable(){    
 
 var indx = $("#searchOpt").val();
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[indx];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }



}