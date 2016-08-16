var todo = angular.module('todoapp', []);


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