'use strict';

var filters = angular.module('filters', []);

filters.filter('title', function() {
	return function(s) { return s && s[0].toUpperCase() + s.slice(1); }
});

filters.filter('sanitize', function() {
	return function(s) { return s && s.split("{")[0]; }
});