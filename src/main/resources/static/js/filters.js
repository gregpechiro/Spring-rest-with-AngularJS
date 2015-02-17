'use strict';

var filters = angular.module('filters', []);

filters.filter('title', function() {
	return function(input, plural) {
	    if (input != null) {
	        var value = input[0].toUpperCase() + input.slice(1);
	        if (plural) {
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

filters.filter('field', function() {
    return function(input) {
        if (input != null) {
            for (var i = 0; i < input.length; i++) {
                if (input[i] == input[i].toUpperCase()) {
                    input = input.substring(0, i) + ' ' + input.substring(i, input.length);
                    i++;
                }
            }
            input = input[0].toUpperCase() + input.slice(1);
            return input
        }
        return input && input[0].toUpperCase() + input.slice(1);
    }
});
