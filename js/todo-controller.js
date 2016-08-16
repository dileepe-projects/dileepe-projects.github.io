var todo = angular.module('todoapp', ['ngSanitize']);


todo.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});


todo.controller('mainController', function($scope){

    
   
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
    $scope.desktopNotification = "<span class='label label-danger'> Not Supported </span>";
    }

    else if(Notification.permission === "granted") {
    $scope.desktopNotification = "<span class='label label-success'> Granted </span>";
    }

    else if(Notification.permission === "denied") {
    $scope.desktopNotification = "<span class='label label-danger'> Denied </span>" + "<span class='badge' data-toggle='tooltip' title='enable in settings'>?</span>";
    }

    else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        $scope.desktopNotification = "<span class='label label-success'> Granted </span>";
      }

      if (permission === "denied") {
            $scope.desktopNotification = "<span class='label label-danger'> Denied </span>" + "<span class='badge' data-toggle='tooltip' title='enable in settings'>?</span>";;
      }

    });
    }

    console.log($scope.desktopNotification);

	$scope.todoitems = [];

	$scope.addTodoItem = function(){
        if($scope.todotext == undefined)
        {
            //alert("Empty Todo, enter a value!");
        }
        else {
		var myDate = new Date();
		var text = $scope.todotext;
		var age = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();		
        $scope.todoitems.push({"text": text, "age": age});
        $scope.todotext = "";
    }

	};

  $scope.orderList = "age";

});