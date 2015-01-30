'use strict';

var filters = angular.module('filters', []);

filters.filter('title', function() {
	return function(input, single) {
	    if (input != null) {
	        var value = input[0].toUpperCase() + input.slice(1);
	        if (single) {
	            value = (value[value.length - 1] == 's') ? value.substring(0, value.length - 1) : value;
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