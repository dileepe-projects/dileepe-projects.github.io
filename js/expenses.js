$.getJSON("./data/data.json", function(json) {
  var data = json.data.month_year;
  var selected_month = "";
  for (var i = 0; i < data.length; i++) {
      //get the month-year from JSON file and add to select options
      $("select").append("<option value='" + data[i].id + "'>" + data[i].month + ' ' + data[i].year + "</option>"); 
  }

  $("#get_data").click(function() {
      $("#expenses").empty();//empty the table
      selected_month = $("#month_year").val();
      if (selected_month == null || selected_month == "") {
          //month should be selected
          alert("Select an option to proceed"); 
      } else {

          for (var j = 0; j < data.length; j++) {
              if (data[j].id == selected_month) {
                  var ote = data[j].Expenses[0].One_Time_Expense;
                  var re = data[j].Expenses[0].Recurring_Expense;
                  var total = 0;
                  var remaining_balance = 0;
                  if (ote.length > 0) {

                      $("#expenses").append("<tr><td class='mergecols' colspan = '2'>One Time Expense</td></tr>");
                      //loop through one time expenses, get the data and append to the table
                      ote.forEach(function(item) {
                          Object.keys(item).forEach(function(key) {
                              total = total + item[key];
                              $("#expenses").append("<tr><td>" + key + "</td> <td>" + item[key] + "</td></tr>")

                          });
                      });
                  }
                  if (re.length > 0) {

                      $("#expenses").append("<tr><td class='mergecols' colspan = '2'>Recurring Expense</td></tr>");
                      //loop through recurring expenses, get the data and append to the table
                      re.forEach(function(item) {
                          Object.keys(item).forEach(function(key) {
                              //if there are multiple transactions for a single item then loop and add it together
                              if (item[key].length > 0) {
                                  var atmwdls = item[key];
                                  for (var z = 0; z < atmwdls.length; z++) {
                                      total = total + atmwdls[z]
                                  }
                              } else {
                                  total = total + item[key];
                              }

                              $("#expenses").append("<tr><td>" + key + "</td> <td>" + item[key] + "</td></tr>")

                          });
                      });
                  }

                  remaining_balance = data[j].Starting_Balance - total;
                  $("#expenses").append("<tr class='bg-warning'><td>Current Balance</td> <td>" + parseFloat(remaining_balance).toFixed(2) + "</td></tr>");
                  var rowCount = $('#expenses_table tr').length;
                  if(rowCount>1)//provide download option only if there is some data 
                  {
                      $('#download_data').prop("disabled",false);
                  }
                  $("#expenses").append("<tr><td class='mergecols' colspan = '2'> Last Updated: "+data[j].LastUpdated+"</td></tr>");

                  

              }

          }
      }
  });
  

});