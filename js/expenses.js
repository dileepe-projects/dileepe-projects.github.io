$.getJSON("./data/data.json", function(json) {
  var data = json.data.month_year;
  var selected_month = "";
  for (var i = 0; i < data.length; i++) {
      $("select").append("<option value='" + data[i].id + "'>" + data[i].month + ' ' + data[i].year + "</option>");
  }

  $("#get_data").click(function() {
      $("#expenses").empty();
      selected_month = $("#month_year").val();
      if (selected_month == null || selected_month == "") {
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
                      ote.forEach(function(item) {
                          Object.keys(item).forEach(function(key) {
                              total = total + item[key];
                              $("#expenses").append("<tr><td>" + key + "</td> <td>" + item[key] + "</td></tr>")

                          });
                      });
                  }
                  if (re.length > 0) {

                      $("#expenses").append("<tr><td class='mergecols' colspan = '2'>Recurring Expense</td></tr>");
                      re.forEach(function(item) {
                          Object.keys(item).forEach(function(key) {

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


              }

          }
      }
  });


});