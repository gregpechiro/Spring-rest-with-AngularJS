'use strict';

var service = angular.module('services', ['ngResource']);

service.factory('entityService', ['$http', function($http) {

	return function(call, uri, entity) {
		switch(call) {
			case "findAll":
				return $http.get(uri).then(function(r){
					return r.data;
				});
			case "findOne":
				return $http.get(uri).then(function(r) {
					return r.data;
				});
			case "update":
				return $http.put(uri, entity).then(function(r) {
					return r.data;
				});
			case "add":
				return $http.post(uri, entity).then(function(r) {
					return r.data;
				});
			case "del":
				return $http.delete(uri).then(function(r) {
					return r.data;
				});
		}
	};

}]);