'use strict';

var filters = angular.module('filters', []);

filters.filter('title', function() {
	return function(input, plural) {
	    if (input != null) {
	        var value = input[0].toUpperCase() + input.slice(1);
	        if (plural) {
	            //value = (value[value.length - 1] == 's') ? value.substring(0, value.length - 1) : value;
	            value = value + 's';
	        }
	        return value
	    }
	    return input && input[0].toUpperCase() + input.slice(1);
	}
});

filters.filter('links', function() {
	return function(input) {
	    return input && input.split("{")[0];
	}
});