'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('ListUsersController', ['$scope', 'Service', function($scope, Service,  factory) {

    // find all users
	function findAll() {
	    Service.findAll('/api/users').then(function(data) {
            $scope.users = data;
        });
	}
	
	// save function options
	var save = {
	    add : function() {Service.add('/api/users', $scope.user).then(function() {
            findAll();
            $scope.user = {};
        })},
        update : function(url) {Service.update(url, $scope.user).then(function() {
            findAll();
            Service.findOne(url).then(function(data) {
                $scope.user = data
            });
        })}
	}
	
	// change save function
	function changeSave(action) {
	    $scope.save = save[action];
	    $scope.saveName = action;
	}
	
	// delete user
	$scope.del = function(url) {
	    Service.del(url).then(function() {
	        findAll();
	        changeSave('add');
	        $scope.user = {};
        });
	}
	
	// display user to edit
	$scope.edit = function(url) {
	    Service.findOne(url).then(function(data) {
	        $scope.user = data;
	        changeSave('update');
	    });
	};
	
	// clear form
	$scope.clear = function() {
		$scope.user = {};
		changeSave('add');
	};
	
	// intit
	changeSave('add');
    findAll();
    $scope.user = {};
    
}]);

controllers.controller('UserController', ['$scope', '$cookieStore', 'Service', function($scope, $cookieStore, Service) {
    
    $scope.user = $cookieStore.get('user');
    
    $scope.save = function() {
        Service.update($scope.user._links.self.href, $scope.user).then(function() {
            Service.findOne(url).then(function() {
                $cookieStore.put('user', data)
                $scope.user = data;
            })
        })
    };
    
}]);


controllers.controller('LoginController', ['$location', '$scope', 'LoginService', function($location, $scope, LoginService) {

    $scope.login = function() {
        if ($scope.username == 'admin' && $scope.password == 'admin') {
            LoginService.adminLogin();
             $location.path('/admin/user');
        } else {
            LoginService.login($scope.username, $scope.password).then(function(data) {
                if (data) {
                    $location.path('/secure/user');
                } else {
                    $scope.err = true;
                }
            });
        }
    }
    
    $scope.err = false;
}]);