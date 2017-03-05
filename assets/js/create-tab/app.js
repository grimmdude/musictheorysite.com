'use strict';

var app = angular
	.module('createTab', [], function($interpolateProvider) {
		$interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
	});