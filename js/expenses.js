$.getJSON( "./data/data.json", function( json ) {
  var data = json.data.month_year;
  var selected_month = "";
  for (var i=0; i<data.length; i++)
  {
    //console.log(data[i].month);
    $("select").append("<option value='" + data[i].id + "'>" + data[i].month + ' ' + data[i].year + "</option>");
    
  }

  $("#get_data").click(function(){

    selected_month = $("#month_year").val(); 
    if(selected_month==null||selected_month=="")
    {
      alert("Select an option to proceed");
    }
    else{
      for(var j=0; j<data.length; j++)
      {
        if(data[j].id==selected_month)
        {
          $("#expenses").empty();
          $("#expenses").append("<tr><td>Month</td> <td>"+data[j].month+"</td></tr>");
          $("#expenses").append("<tr><td>Year</td> <td>"+data[j].year+"</td></tr>");
          $("#expenses").append("<tr><td>Starting Balance</td> <td>"+data[j].starting_balance+"</td></tr>");
         
          var obj = data[j].expenses;
          var total = 0;
          var remaining_balance = 0;
          obj.forEach(function(item) {
            Object.keys(item).forEach(function(key) {
              total = total + item[key];
              $("#expenses").append("<tr><td>" + key + "</td> <td>"+item[key]+"</td></tr>")
              console.log(key + ": " + item[key]);
            });
          });
          remaining_balance = data[j].starting_balance - total;
          $("#expenses").append("<tr class='bg-success'><td>Current Balance</td> <td>"+parseFloat(remaining_balance).toFixed(2)+"</td></tr>");
          
        

        }
        
      }
    }
  });

  
});