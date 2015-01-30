'use strict';

var service = angular.module('services', ['ngResource']);

service.factory('entityService', ['$http', function($http) {

	return function(call, url, entity) {
		switch(call) {
			case "findAll":
				return $http.get(url).then(function(r){
					return r.data;
				});
			case "findOne":
				return $http.get(url).then(function(r) {
					return r.data;
				});
			case "update":
				return $http.put(url, entity).then(function(r) {
					return r.data;
				});
			case "add":
				return $http.post(url, entity).then(function(r) {
					return r.data;
				});
			case "del":
				return $http.delete(url).then(function(r) {
					return r.data;
				});
		}
	};

}]);