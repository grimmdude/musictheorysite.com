'use strict';

var UIApp = angular
	.module('earTraining', [], function($interpolateProvider) {
		$interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
	});