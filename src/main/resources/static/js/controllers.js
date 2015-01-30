'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('MainController', ['$scope', 'entityService', function($scope, entityService) {

    var uri = '/api/users/';
    $scope.name = 'users';

	function changeSave(e) {
		$scope.save = save[e];
		$scope.saveName = e;
	}

	function findAll() {
		entityService("findAll", "/api").then(function(data){
			$scope.buttons = data;
		});
		entityService("findAll", uri).then(function(data) {
			$scope.entities = data;
		});
	}

	var save = {
	    add : function() {entityService("add", uri, $scope.entity).then(function() {
			findAll(); $scope.entity = {};
        })},
        update : function(uri) {entityService("update", uri, $scope.entity).then(function() {
			findAll();
			entityService("findOne", uri).then(function(data) { $scope.entity = data; });
        })}
	};

	$scope.del = function(uri) {
		entityService("del", uri).then(function() {
			findAll(); $scope.entity = {};
        });
	};

	$scope.edit = function(uri) {
		entityService("findOne", uri).then(function(data) {
	        $scope.entity = data; changeSave('update');
	    });
	};

	$scope.clear = function() {
		$scope.entity = {}; changeSave('add');
	};

	changeSave('add');
	findAll();
    $scope.entity = {};

}]);