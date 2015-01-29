'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('ListController', ['$scope', 'Service', function($scope, Service) {

    var url = '/api/users/'
    $scope.name = 'users'

    // find all users
	function findAll() {
	    Service.findAll(url).then(function(data) {
            $scope.entities = data;
        });
	}

	// save function options
	var save = {
	    add : function() {Service.add(url, $scope.entity).then(function() {
            findAll();
            $scope.entity = {};
        })},
        update : function(url) {Service.update(url, $scope.entity).then(function() {
            findAll();
            Service.findOne(url).then(function(data) {
                $scope.entity = data
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
	        $scope.entity = {};
        });
	}

	// display user to edit
	$scope.edit = function(url) {
	    Service.findOne(url).then(function(data) {
	        $scope.entity = data;
	        changeSave('update');
	    });
	};

	// clear form
	$scope.clear = function() {
		$scope.entity = {};
		changeSave('add');
	};

	// intit
	changeSave('add');
    findAll();
    $scope.entity = {};

}]);

controllers.controller('MainController', ['$scope', 'Service', function($scope, Service) {

    // find all users
	function findAll() {
	    Service.findAll('/api').then(function(data) {
            $scope.buttons = data;
        });
	}
    findAll();

}]);