'use strict';

var service = angular.module('services', ['ngResource']);

service.factory('entityService', ['$resource', function($resource) {
    return function(url, call) {
        return $resource(url);
    };

}]);

service.factory('htmlService', [function() {

    var generateTable = function(fields, i) {
        var html = '';
        html = '<div class="panel panel-default"><table class="table table-striped"><thead><tr>';
        for (var index = 0; index < fields.length; index++) {
           html += '<th>{{ "' + fields[index] + '" | field }}</th>';
        }
        html += '</tr></thead><tbody><tr ng-repeat="object in object' + i + '">'
        for (var index = 0; index < fields.length; index++) {
            html += '<td>{{ object.' + fields[index] + ' }}</td>';
        }
        html += '</tr></tbody></table></div>';
        return html;
    };
    
    var generateForm = function(fields, i, resource) {
        
        var html = '';
        html += '<div class="panel panel-default"><div class="panel-body">';
        for (var index = 0; index < fields.length; index++) {
            html += '<div class="form-group">'+
            '<input class="form-control" ng-model="object' + i + '.' + fields[index] + '" placeholder="{{ \'' + fields[index] + '\' | field }}">' +
            '</div>';
        }
        html += '<button class="btn btn-primary btn-block" ng-click="click' + i + '(\'' + resource + '\', ' + i + ')">Save</button></div></div>';
        return html;
    };

    return {
        generateTable : generateTable,
        generateForm : generateForm
    }

}]);