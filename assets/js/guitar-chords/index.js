var tonal_chord = require('tonal-chord');
var tonal_fretboard = require('tonal-fretboard');
var angular = require('angular');
// Doesn't play nice with require()
//var Raphael = require('raphael');

angular.module('guitarChordChart', [], function($interpolateProvider) {
		$interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

}).controller('GuitarChordController', ['$window', '$scope', '$log', function ($window, $scope, $log) {
	$scope.chordName = '';
	$scope.chordShapes = [];

	$scope.updateChord = function() {
		$('#chords-container').empty();

		if ($scope.chordName) {
			$scope.chordShapes = tonal_fretboard.chordShapes('guitar', tonal_chord.notes($scope.chordName), 0, 12, 4);
			//$log.info($scope.chordShapes);
			// Reverse so they're in order on page.
			$scope.chordShapes.reverse();

			//$log.info($scope.chordShapes);
			$scope.chordShapes.forEach(function(shape) {
				var div = $('#chords-container').append('<div></div>');
				var paper = Raphael(div[0], 160, 140);
				var chord = new ChordBox(paper, 30, 30);

				// Position should be lowest played fret.
				// Basically a Math.min() implementation but with considerations for null/Array values.
				var lowestFret = shape.reduce(function(accum, value) {
					if (Array.isArray(value)) value = value[0];
					return value && value < accum ? value : accum;
				}, 100);

				// If position is > 0 then dial it back one notch so lower frets don't appear as open ones.
				if (lowestFret <= 2) {
					var position = 0;

				} else {
					var position = parseInt(lowestFret);
				}

				chord.setChord(shape.reverse().map(function(item, index) {
					if (Array.isArray(item)) {
						var fret_number = item[0] - (position ? position - 1 : position);

					} else if (item) {
						var fret_number = item - (position ? position - 1 : position);

					} else {
						var fret_number = 'x';
					}

					return [index + 1, fret_number];
				}), position);

				//chord.setChord([[1, 2], [2, 1], [3, 2], [4, 0], [5, 'x'], [6, 'x']]);
				chord.draw();
			});
		}
	};

	/**
	 * Ensure that the key name is capitalized.
	 */
	$scope.normalizedChordName = function() {
		return $scope.chordName.substring(0, 1).toUpperCase() + $scope.chordName.substring(1);
	};

	if ($window.CHORDNAME) {
		$scope.chordName = $window.CHORDNAME;
		$scope.updateChord();
	}
}]);

