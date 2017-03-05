'use strict';

app.controller('CreateTabCtl', [ '$window', '$scope', '$log', '$sce', function ($window, $scope, $log, $sce) {
	$scope.artist;
	$scope.song;
	$scope.lyrics;
	$scope.lyricsHTML;// = $sce.trustAsHtml('test');
	$scope.chordRegEx = /(\b[CDEFGAB](?:#{1,2}|b{1,2})?(?:7?|9?|11?|m?|m7?|maj?|maj7?|min7?|sus2?|sus4?)\b)/g;

	$scope.lyricsToHTML = function() {
		$scope.lyricsHTML = $sce.trustAsHtml(
								$scope.lyrics
									.replace(/</g, '&lt;')
									.replace(/  /g, '&nbsp;&nbsp;')
									.replace(/\n/g, '<br />')
									.replace($scope.chordRegEx, '<b>$1</b>')
									);

		$scope.parseChords();
	};

	$scope.lyricsToText = function() {
		$scope.lyrics = $scope.lyrics;
	};

	$scope.parseChords = function() {
		$log.info($scope.lyricsHTML.toString().replace($scope.chordRegEx, '<b>$1</b>'));
	};
}]);