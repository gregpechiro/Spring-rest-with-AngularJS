'use strict';

var crudApp = angular.module('crudApp', [ 'ngRoute', 'controllers', 'services', 'filters', 'directives' ]);

crudApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "app/main.html",
			controller: "MainController"
		})
		.when('/create', {
		    templateUrl: "app/create.html",
		    controller: "CreateController"
		})
		.when('/template1/:name', {
		    templateUrl: "app/temp1.html",
		    controller: "CustomController"
		})
		.when('/template2/:name', {
            templateUrl: "app/temp2.html",
            controller: "CustomController"
        })
        .when('/template3/:name', {
            templateUrl: "app/temp3.html",
            controller: "CustomController"
        })
        .when('/template4/:name', {
            templateUrl: "app/temp4.html",
            controller: "CustomController"
        })
}]);
