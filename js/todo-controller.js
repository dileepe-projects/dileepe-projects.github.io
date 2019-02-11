var todoapp = angular.module('todoapp', []);



todoapp.controller('todoController', function($scope, $window, dateFilter, $interval) {




//check if local storage is available

if (!window.localStorage) {
    $scope.localstorage = "Not Supported ";
    $scope.storageClass = "glyphicon glyphicon-remove red";    
    $scope.todoList = []; //initialize todolist as blank
    }

    else {
     $scope.localstorage = "Available ";   
     $scope.storageClass = "glyphicon glyphicon-ok green";
     var storedtodoList = localStorage.getItem('TODOLIST');
     if(JSON.parse(storedtodoList)== null)
     {
         $scope.todoList = []; //initialize todolist as blank
     }

     else
     {
         $scope.todoList = JSON.parse(storedtodoList); //initialize todolist with data from localstorage
     }

    }






//check if desktop notification is available in the current browser
	if (!("Notification" in window)) {
	    $scope.desktopNotification = "Not Supported ";
	    $scope.notificationClass = "glyphicon glyphicon-remove red";
        $scope.notificationsAvailable = false;	    
    }

    else if(Notification.permission === "granted") {
    $scope.desktopNotification = "Available ";
    $scope.notificationClass = "glyphicon glyphicon-ok green";
    $scope.notificationsAvailable = true;
    }

    else if(Notification.permission === "denied") {
    $scope.desktopNotification = "Denied by user (change this in browser settings) ";
    $scope.notificationClass = "glyphicon glyphicon-exclamation-sign orange";
    $scope.notificationsAvailable = false;
    }

    else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
		     // $window.location.reload(); //reload to see what the user has selected (this is needed in chrome)
		      if (permission === "granted") {
		       $scope.desktopNotification = "Available ";
		       $scope.notificationClass = "glyphicon glyphicon-ok green";
               $scope.notificationsAvailable = true;
		      }

		      if (permission === "denied") {
		         $scope.desktopNotification = "Denied by user (change this in browser settings) ";
		    	 $scope.notificationClass = "glyphicon glyphicon-exclamation-sign orange";
                 $scope.notificationsAvailable = false;
		      }
    });
    }




   

//function to add todo items
    $scope.todoAdd = function() {
        
        if($scope.todoInput == undefined||$scope.todoInput == "")
        {

        }
        else {
        $scope.todoList.push({todoText:$scope.todoInput, createdOn: dateFilter(new Date(), "MM/dd/yyyy"), todoDate:'', todoReminder:'NA', todoReminded: true, todoCompleted: false});        
        $scope.todoInput = "";
        $scope.storeTODO(); //update todolist in storage
    	}
    };    



//function to remove todo item
    $scope.removetask = function($index){    
    $scope.todoList.splice($index,1);  
    $scope.storeTODO(); //update todolist in storage
    };


//function to mark task as complete
    $scope.completetask = function($index){   

    if(!$scope.todoList[$index].todoCompleted)
    {
        $scope.todoList[$index].todoCompleted = true; 
        $scope.todoList[$index].todoDate = "";
        $scope.todoList[$index].todoReminder = "NA";
        $scope.todoList[$index].todoReminded = true;
        $scope.storeTODO(); //update todolist in storage            
    } 

    else {
        $scope.todoList[$index].todoCompleted = false;             
        $scope.storeTODO(); //update todolist in storage
        }
    
    };

//function to set reminder minutes in modal
    $scope.passReminder = function($index){
    	
            $scope.currentSNO = $index;    	
            var now = new Date();
            now.setMinutes(now.getMinutes() + 2); //twominutes interval to set the reminder
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0,0,0,0);
            $scope.availableOptions = [];
            while( now < tomorrow ) {      
              $scope.availableOptions.push({id: dateFilter(now, 'h:mm a'), name: dateFilter(now, 'h:mm a')})          
              now.setMinutes(now.getMinutes() + 2); //twominutes interval to set the reminder (change here also)
            }
            $scope.selectedTime = $scope.availableOptions[0].name;
    }

//function to add reminder to a task
    $scope.addReminder = function(){    	
    	$scope.todoList[$scope.currentSNO].todoReminder = $scope.selectedTime;  
        $scope.todoList[$scope.currentSNO].todoDate = dateFilter(new Date(), "MM/dd/yyyy");
        $scope.todoList[$scope.currentSNO].todoReminded = false; 
        $scope.todoList[$scope.currentSNO].todoCompleted = false;
    	$scope.closemodal = "modal";            
        $scope.storeTODO(); //update todolist in storage	
    }







//function to check reminder time with respect to current
    function checkTime() {       
         
         if($scope.todoList.length > 0)
         {    
		        for(var i=0; i<$scope.todoList.length; i++)
		        {
		        	if(dateFilter(new Date(), 'h:mm a') == $scope.todoList[i].todoReminder  && ! $scope.todoList[i].todoReminded)
			        {
                        console.log("found match on: " + i + ", at " + $scope.todoList[i].todoReminder);
                        notifyme($scope.todoList[i].todoText, 'images/todo.png', 'TODO App says');
			           	spawnNotification($scope.todoList[i].todoText, 'images/todo.png', 'TODO App says');
			          	$scope.todoList[i].todoReminded = true;	
                        $scope.storeTODO(); //update todolist in storage
			        }			       
		        }
		 }

    }
    
//function to show desktop notifications    
    function spawnNotification(theBody, theIcon, theTitle) {
		  var options = {
		    body: theBody,
		    icon: theIcon
		  }
  		var n = new Notification(theTitle, options);  
    }

function notifyme(theBody, theIcon, theTitle){
    $.notify({
        icon: theIcon,
        title: "<strong>"+theTitle+": </strong> ",
        message: theBody
    });
}

//timer that runs and checks reminder at given interval
if( "Notification" in window && Notification.permission === "granted") {
console.log("timer is on!");
$interval(checkTime, 5000); //5seconds ticker
}


//function to store todolist, will be called during insert, delete and update
$scope.storeTODO = function(){

    if (!window.localStorage) {

    }
    else localStorage.setItem('TODOLIST', JSON.stringify($scope.todoList));
}

});

