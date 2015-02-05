'use strict';

/* App Module */

var userApp = angular.module('app', [
	'ngRoute',
	'controllers',
	'services'
]);

userApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'temp/home.html'
		})
		.when('/secure/user', {
			templateUrl: 'temp/users.html',
			controller: 'ListUsersController',
			resolve: {
			    factory: checkAuth
			}
		})
		.when('/login', {
		    templateUrl: 'temp/login.html',
		    controller: 'LoginController'
		})
		.when('/logout', {
		    resolve: {
		        factory : logout
		    },
		    redirectTo : '/'
		});
}]);

var checkAuth = function($cookieStore, $location) {
    if ($cookieStore.get('user')) {
        return true;
    } else {
        $location.path('/login');
    }
};

var logout = function($cookieStore) {
    $cookieStore.remove('user');
};