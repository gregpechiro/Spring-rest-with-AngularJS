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

services.factory('LoginService', ['$http', '$cookieStore', function($http, $cookieStore) {

    var adminLogin = function() {
        var user = {
            username:'admin',
            password:'admin',
            role:'ROLE_ADMIN'
        };
        $cookieStore.put('user', user);
    };

    // mock login service method would call database here
    var login = function(username, password) {
        var promise = $http.get('/api/users/search/findByUsernameAndPassword', {
                params: {
                    'username': username,
                    'password': password
                }
            })
            .then(function(response) {
                if (response.data != null && JSON.stringify(response.data) != '{}') {
                    alert('if');
                    $cookieStore.put('user', response.data._embedded.users[0]);
                    return true;
                } else {
                    return false;
                }
            });
        return promise;
    };

    return {
        login : login,
        adminLogin:adminLogin
    }

}]);

services.factory('LogoutService', ['$cookieStore', function($cookieStore) {
    return function() {
        $cookieStore.remove('user');
    }
}]);
