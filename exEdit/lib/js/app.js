var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./partials/main.html"
    })
    .when("/import", {
        templateUrl : "./partials/import.html"
    })
    .when("/edit", {
        templateUrl : "./partials/edit.html"
    })
    .when("/view", {
        templateUrl : "./partials/view.html"
    })
    .when("/export", {
        templateUrl : "./partials/export.html"
    })
    .otherwise({
        redirectTo : "/"
    })
     // use the HTML5 History API
     $locationProvider.html5Mode(true);
});


