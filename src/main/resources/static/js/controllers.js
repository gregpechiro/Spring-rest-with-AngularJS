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
            var fields = [];
            for (var key in $scope.positions[i].fields) {
                if ($scope.positions[i].fields[key]) {
                    fields.push(key);
                }
            }
            var html = ''
            switch ($scope.positions[i].type) {
                case 'table':
                    html = '<table class="table table-striped"><thead><tr>';
                    for (var index = 0; index < fields.length; index++) {
                       html += '<th>' + fields[index] + '</th>';
                    }
                    html += '</tr></thead><tbody><tr ng-repeat="object in object' + i + '">'
                    for (var index = 0; index < fields.length; index++) {
                        html += '<td>{{ object.' + fields[index] + ' }}</td>';
                    }
                    html += '</tr></tbody></table>';
                    break;
            }
            position['html'] = html;
            $scope.layout.positions.push(position);
        }
        
        entityService('/layout').save($scope.layout);
    };

}]);

controllers.controller('CustomController', ['$scope', '$routeParams', '$compile', 'entityService', function($scope, $routeParams, $compile, entityService) {

    $scope.layouts = entityService('/layout').query();

    entityService('/layout/' + $routeParams.name).get().$promise.then(function(data) {
        $scope.layout = data
        for (var i = 0; i < data.positions.length; i++) {
            $scope['item' + i] = data.positions[i].html;
            $scope['object' + i] = entityService('/'+ data.positions[i].resource).query();
        }
    });
    
    $scope.refresh = function() {
        for (var i = 0; i < $scope.layout.positions.length; i++) {
            $scope['object' + i] = entityService('/'+ $scope.layout.positions[i].resource).query();
        }
    }
}]);

