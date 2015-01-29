'use strict';

/* App Module */

var userApp = angular.module('userApp', [
	'ngRoute',
	'controllers',
	'services',
	'filters'
]);

userApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'temp/test.html',
			controller: 'MainController'
		})
		.when('/list', {
			templateUrl: 'temp/list.html',
			controller: 'ListController'
		})
}]);