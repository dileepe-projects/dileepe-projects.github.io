document.addEventListener('DOMContentLoaded', function() {

document.getElementById("submit").onclick = function() {

    let pattern = /[0-9]+/gm;
    var re = /\S+@\S+\.\S+/;

    //check for empty fields
    if ( document.getElementById("name").value == ""||document.getElementById("mobile").value == ""||document.getElementById("email").value == "")
    {       
        document.getElementById("error").style.display = "block";
    }
    //check for name length and only alphabet
    else if ( document.getElementById("name").value.length > 20 || pattern.test(document.getElementById("name").value)){
        document.getElementById("error").style.display = "block";        
    }
    //check for mobile length and only number
    else if ( document.getElementById("mobile").value.length > 10 || !(pattern.test(document.getElementById("mobile").value))){
        document.getElementById("error").style.display = "block";        
    }
   
    //check for email length and validate
    else if ( document.getElementById("email").value.length > 40 || !(re.test(document.getElementById("email").value))){
        document.getElementById("error").style.display = "block";        
    }
    else{
        document.getElementById("error").style.display = "none";   
        var table = document.getElementById("summaryTable");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        
        //update cells with input values
        cell1.innerHTML = document.getElementById("name").value;
        cell2.innerHTML = document.getElementById("mobile").value;
        cell3.innerHTML = document.getElementById("email").value;
        
        //clear values after insert
        document.getElementById("name").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("email").value = "";

        //sort name column

        
        const headers = table.querySelectorAll('th');
        const tableBody = table.querySelector('tbody');
        const rows = tableBody.querySelectorAll('tr');
    
        // Track sort directions
        const directions = Array.from(headers).map(function(header) {
            return '';
        });
    
        // Transform the content of given cell in given column
        const transform = function(index, content) {
            // Get the data type of column
            const type = headers[index].getAttribute('data-type');
            switch (type) {
                case 'number':
                    return parseFloat(content);
                case 'string':
                default:
                    return content;
            }
        };
    
        const sortColumn = function(index) {
            // Get the current direction
            const direction = directions[index] || 'asc';
    
            // A factor based on the direction
            const multiplier = (direction === 'asc') ? 1 : -1;
    
            const newRows = Array.from(rows);
    
            newRows.sort(function(rowA, rowB) {
                const cellA = rowA.querySelectorAll('td')[index].innerHTML;
                const cellB = rowB.querySelectorAll('td')[index].innerHTML;
    
                const a = transform(index, cellA);
                const b = transform(index, cellB);    
    
                switch (true) {
                    case a > b: return 1 * multiplier;
                    case a < b: return -1 * multiplier;
                    case a === b: return 0;
                }
            });
    
            // Remove old rows
            [].forEach.call(rows, function(row) {
                tableBody.removeChild(row);
            });
    
            // Reverse the direction
            directions[index] = direction === 'asc' ? 'desc' : 'asc';
    
            // Append new row
            newRows.forEach(function(newRow) {
                tableBody.appendChild(newRow);
            });
        };
    
        [].forEach.call(headers, function(header, index) {
            header.addEventListener('click', function() {
                sortColumn(index);
            });
        });


    }

 
};

});
