'use strict';

/* Services */

var services = angular.module('services', ['ngResource', 'ngCookies']);

services.factory('Service', ['$http', function($http){
    // find all
    var findAll = function(url) {
        var promise = $http.get(url).then(function (response) {
            return response.data;
        });
        return promise;
    };
    
    // find one
    var findOne = function(url) {
        var promise = $http.get(url).then(function (response) {
            return response.data;
        });
        return promise;
    };
    
    // update existing
    var update = function(url, entity) {
        var promise = $http.put(url, entity).then(function (response) {
            return response.data;
        });
        return promise;
    };

    // add new user
    var add = function(url, entity) {
        var promise = $http.post(url, entity).then(function (response) {
            return response.data;
        });
        return promise;
    };
    
    // delete user
    var del = function(url) {
        var promise = $http.delete(url).then(function (response) {
            return response.data;
        });
        return promise;
    };

    return {
        findAll : findAll,
        findOne : findOne,
        update : update,
        add : add,
        del : del
    };
}]);

services.factory('AuthService', ['$cookieStore', function($cookieStore) {

    // mock login service method would call database here
    var login = function(username, password) {
        if (username == 'gregpechiro@yahoo.com' && password == 'testing') {
            var user = {username:username, password: password};
            $cookieStore.put('user', user);
            return true;
        } else {
            return false;
        }
    }
    
    return {
        login: login
    }
    
}]);
