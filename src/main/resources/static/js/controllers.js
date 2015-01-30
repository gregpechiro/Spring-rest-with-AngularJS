'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('MainController', ['$scope', 'entityService', function($scope, entityService) {

    var baseUrl = ''

	function changeSave(action) {
		$scope.save = save[action];
		$scope.saveName = action;
	}

	function findAll(url) {
		entityService("findAll", url).then(function(data) {
			$scope.entities = data;
		});
	}

	var save = {
	    add : function() {
	        entityService("add", url, $scope.entity).then(function() {
			    findAll(baseUrl); $scope.entity = {};
			    changeSave('add');
            }
        )},
        update : function(url) {
            entityService("update", url, $scope.entity).then(function() {
			    findAll(baseUrl);
			    entityService("findOne", url).then(function(data) {
			        $scope.entity = data;
			    });
            }
        )}
	};

	$scope.del = function(url) {
		entityService("del", url).then(function() {
			findAll(baseUrl); $scope.entity = {};
			changeSave('add');
			$scope.showForm = false;
        });
	};

	$scope.edit = function(url) {
		entityService("findOne", url).then(function(data) {
	        $scope.entity = data; changeSave('update');
	        $scope.showForm = true;
	    });
	};

	$scope.clear = function() {
		$scope.entity = {}; changeSave('add');
		$scope.showForm = false;
	};

    $scope.setEntity = function(url, name) {
        $scope.showForm = false;
        findAll(url);
        $scope.name = name;
        changeSave('add');
        $scope.entity = {};
        baseUrl = url
    };

	//changeSave('add');
	//findAll('/api/users');
    //$scope.entity = {};
    
    // init
    entityService("findAll", "/api").then(function(data){
    	$scope.buttons = data;
    });

}]);