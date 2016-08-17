var todo = angular.module('todoapp', []);



todo.controller('mainController', function($scope, $interval, dateFilter){

    

    var format = "M/d/yy, h:mm:ss a"; //format for reminder date and time

    var target = "8/16/16, 4:22:23 PM";

    

    var promise; //promise that returns interval

    //check if the browser supports notifications
    if (!("Notification" in window)) {
    $scope.desktopNotification = "Not Supported";
    $scope.labelClass = "label label-danger";
    }

    else if(Notification.permission === "granted") {
    $scope.desktopNotification = Notification.permission;
    $scope.labelClass = "label label-success";
    }

    else if(Notification.permission === "denied") {
    $scope.desktopNotification = Notification.permission;
    $scope.labelClass = "label label-danger";
    }

    else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
     
      if (permission === "granted") {
        $scope.desktopNotification = Notification.permission;
        $scope.labelClass = "label label-success";
      }

      if (permission === "denied") {
         $scope.desktopNotification = Notification.permission;
         $scope.labelClass = "label label-danger";
      }

    });
    }

    function updateTime() {
        console.log(dateFilter(new Date(), format));
        if(dateFilter(new Date(), format) == target)
        {
            spawnNotification('Hi There!', 'images/todo.png', 'TODO App says');
            //var notification = new Notification("Hi there!");
        }

    }

    //promise =  $interval(updateTime, 1000);

    $scope.stopInterval = function(){
        $interval.cancel(promise);
     }
        
	$scope.todoitems = [];

	$scope.addTodoItem = function(){
        if($scope.todotext == undefined)
        {
            //alert("Empty Todo, enter a value!");
        }
        else {
		//var myDate = new Date();
		var text = $scope.todotext;
		//var age = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();		
        var age= dateFilter(new Date(), format);
        $scope.todoitems.push({"text": text, "age": age, "reminder": "NA"});
        $scope.todotext = "";
    }

	};

  $scope.orderList = "age";

  function spawnNotification(theBody, theIcon, theTitle) {
  var options = {
    body: theBody,
    icon: theIcon
  }
  var n = new Notification(theTitle, options);  
    }

    var now = new Date();
    now.setMinutes(now.getMinutes() + 5);

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0,0,0,0);
    
    $scope.availableOptions = [];

    
    console.log(tomorrow);

    

    while( now < tomorrow ) {

      

      //console.log(dateFilter(now, 'h:mm a'));

      $scope.availableOptions.push({id: dateFilter(now, 'h:mm a'), name: dateFilter(now, 'h:mm a')})
          
      now.setMinutes(now.getMinutes() + 5);
    }


    $scope.setreminder = function(){

      console.log($scope.selectedTime);



    }

  

});