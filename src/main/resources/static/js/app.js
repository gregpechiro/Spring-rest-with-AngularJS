'use strict';

var crudApp = angular.module('crudApp', [ 'ngRoute', 'controllers', 'services', 'filters' ]);

crudApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "app/main.html",
			controller: "MainController"
		})
		.when('/custom', {
		    templateUrl: "app/custom.html",
		    controller: "CustomController"
		})
}]);