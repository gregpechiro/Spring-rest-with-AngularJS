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
			templateUrl: 'temp/user.html',
			controller: 'UserController',
			resolve: {
			    factory: checkAuth
			}
		})
		.when('/admin/user', {
		    resolve: {
		        factory: checkAdmin
		    },
		    templateUrl: 'temp/users.html',
		    controller: 'ListUsersController'
		})
		.when('/login', {
		    templateUrl: 'temp/login.html',
		    controller: 'LoginController'
		})
		.when('/error', {
		    templateUrl: 'temp/error.html'
		})
		.when('/logout', {
		    resolve: {
		        factory : logout
		    },
		    redirectTo : '/'
		});
}]);

var checkAuth = function($cookieStore, $location) {
    var user = $cookieStore.get('user')
    if (user != null && user != {}) {
        return true;
    } else {
        $location.path('/login');
    }
};

var checkAdmin = function($cookieStore, $location) {
    var user = $cookieStore.get('user');
    if (user != null && user != {}) {
        if (user.role == 'ROLE_ADMIN') {
            return true;
        } else {
            $location.path('/error');
        }
    } else {
        $location.path('/login');
    }
}

var logout = function($cookieStore) {
    $cookieStore.remove('user');
};