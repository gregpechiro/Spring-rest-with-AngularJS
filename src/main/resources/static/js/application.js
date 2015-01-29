'use strict';

/* App Module */

var userApp = angular.module('userApp', [
	'ngRoute',
	'controllers',
	'services'
]);

userApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'temp/home.html'
		})
		.when('/user', {
			templateUrl: 'temp/users.html',
			controller: 'ListUsersController'
		})
}]);