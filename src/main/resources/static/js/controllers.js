'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('MainController', ['$scope', 'entityService', function($scope, entityService) {

    $scope.layouts = entityService('/layout').query();

    $scope.baseUrl = ''

	function changeSave(action) {
		$scope.save = save[action];
		$scope.saveName = action;
	}

	function findAll(url) {
	    $scope.entities = entityService(url).query();
	}

	var save = {
	    add : function(url) {
	        entityService(url).save($scope.entity).$promise.then(function(data) {
                findAll($scope.baseUrl);
            });
            changeSave('add');
	        $scope.entity = entityService(baseUrl + '/new').get();
        },
        update : function(url) {
            entityService(url).save($scope.entity).$promise.then(function(data) {
                $scope.entity = data;
                findAll($scope.baseUrl);
            });
        }
	};

	$scope.del = function(url) {
	
	    entityService(url).remove().$promise.then(function() {
	        findAll($scope.baseUrl);
	    });
	    changeSave('add');
	    $scope.showForm = false;
	    $scope.entity = entityService(baseUrl + '/new').get();
	};

	$scope.edit = function(url) {
	    $scope.entity = entityService(url).get()
	    changeSave('update');
        $scope.showForm = true;
	};

	$scope.clear = function(show) {
		$scope.entity = entityService($scope.baseUrl + '/new').get();
		changeSave('add');
		$scope.showForm = show;
	};

    $scope.setEntity = function(url, name) {
        $scope.showForm = false;
        findAll(url);
        $scope.name = name;
        changeSave('add');
        $scope.entity = entityService(url + '/new').get();
        $scope.baseUrl = url
    };
    
    // init
    $scope.buttons = entityService('/info/tables').get()

}]);

controllers.controller('CreateController', ['$scope', 'entityService', function($scope, entityService) {

    $scope.layouts = entityService('/layout').query();

    $scope.layout = {};
    
    $scope.layout.positions = [];
    
    $scope.positions = [];

    $scope.tables = entityService('/info/tables').get();
    
    $scope.buttons = entityService('/info/tables').get()
    
    $scope.types = ['table', 'form'];
    
    $scope.availablePositions = ['position1', 'position2', 'position3', 'position4']
    
    $scope.fields = {stuff:"stuff"};
    
    $scope.save = function() {
        for (var i = 0; i < $scope.positions.length; i++) {
            var position = {};
            position['resource'] = $scope.positions[i].resource;
            position['type'] = $scope.positions[i].type;
            var fields = [];
            for (var key in $scope.positions[i].fields) {
                if ($scope.positions[i].fields[key]) {
                    fields.push(key);
                }
            }
            position['fields'] = fields;
            $scope.layout.positions.push(position);
        }
        
        entityService('/layout').save($scope.layout);
    };

}]);

controllers.controller('CustomController', ['$scope', '$routeParams', '$compile', 'entityService', 'htmlService',
function($scope, $routeParams, $compile, entityService, htmlService) {

    $scope.layouts = entityService('/layout').query();

    entityService('/layout/' + $routeParams.name).get().$promise.then(function(data) {
        $scope.layout = data
        for (var i = 0; i < data.positions.length; i++) {
            switch (data.positions[i].type) {
                case 'table' :
                    $scope['item' + i] = htmlService.generateTable(data.positions[i].fields, i);
                    $scope['object' + i] = entityService('/'+ data.positions[i].resource).query();
                    break;
                case 'form' :
                    $scope['item' + i] = htmlService.generateForm(data.positions[i].fields, i, data.positions[i].resource);
                    $scope['click' + i] = function(resource, objectNumber) {
                        entityService('/' + resource).save($scope['object' + objectNumber]).$promise.then(function() {
                            $scope.refresh();
                        });
                    };
            }
        }
    });
    
    $scope.refresh = function() {
        for (var i = 0; i < $scope.layout.positions.length; i++) {
             switch ($scope.layout.positions[i].type) {
                case 'table' :
                    $scope['object' + i] = entityService('/'+ $scope.layout.positions[i].resource).query();
                    break;
                case 'form' :
                    $scope['object' + i] = {};
             }
        }
    }
    
}]);

