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
		.when('/custom/:name', {
		    templateUrl: "app/custom.html",
		    controller: "CustomController"
		})
}]);
