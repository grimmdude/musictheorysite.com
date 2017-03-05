'use strict';

var UIApp = angular
	.module('earTraining', [], function($interpolateProvider) {
		$interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
	});
'use strict';

UIApp.controller('EarTrainingCtrl', [ '$window', '$scope', '$log', 'EarTrainingService','$timeout', function ($window, $scope, $log, EarTrainingService, $timeout) {
	$scope.currentInterval = EarTrainingService.getRandomInterval();
	$scope.currentNotes = EarTrainingService.getIntervalNotes($scope.currentInterval);
	$scope.selectedOptions = [];
	$scope.notesPlaying = false;

	$scope.notes = EarTrainingService.getAllNotes();
	$scope.intervals = EarTrainingService.getIntervals();
	$scope.score = 0;
	$scope.numberOfClicks = 0;
	$scope.numberOfQuestions = 1;
	$scope.scorePercent = 0;
	$scope.successMessage;
	$scope.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	$scope.oscillator = $scope.audioCtx.createOscillator();
	$scope.gainNode = $scope.audioCtx.createGain();
	$scope.audioBuffers = {};
	$scope.audioLoaded = false;
	$scope.frequencies = EarTrainingService.getFrequencies();

	$scope.playSound = function(buffer, duration) {
	  	var source = $scope.audioCtx.createBufferSource(); // creates a sound source
	  	source.buffer = buffer;                    // tell the source which sound to play
	  	source.connect($scope.audioCtx.destination);       // connect the source to the context's destination (the speakers)
	  	source.start(0);                           // play the source now   
	  	$timeout(function() {
	  		source.stop(0);
	  	}, duration);                                      // note: on older systems, may have to use deprecated noteOn(time);
	}

	$scope.playNotes = function(speed, buttonClicked) {
		// Event tracking
		if (buttonClicked) {
			$window.ga('send', 'event', 'interval-training', 'click', 'play button');
		}

		$scope.notesPlaying = true;
		speed = speed || 700;

		//$scope.playSound($scope.audioBuffers[$scope.currentNotes[0]], speed);
		$scope.startTone($scope.frequencies[$scope.currentNotes[0]]);
		$timeout(function() {
			//$scope.playSound($scope.audioBuffers[$scope.currentNotes[1]], speed);
			$scope.startTone($scope.frequencies[$scope.currentNotes[1]]);

			$timeout(function() {
				$scope.stopTone();
				$scope.notesPlaying = false;
			}, speed)
		}, speed);

/*
		document.getElementById('firstNote').load();
		document.getElementById('secondNote').load();

		angular.element('audio#firstNote')
			.on('canplaythrough', function() {
				angular.element('audio#firstNote').trigger('play');
				$timeout(function() {
					angular.element('audio#firstNote').trigger('pause');
					angular.element('audio#secondNote')
						.trigger('play');
					$timeout(function() {
						angular.element('audio#secondNote').trigger('pause');
						$scope.notesPlaying = false;
					}, speed);
				}, speed);
			});
*/
	};

	/*
	 * Load current notes' audio
	 */
	$scope.loadAudio = function(note, filename) {
		var format = Modernizr.audio.ogg ? 'ogg' : 'mp3';
		var noteUrls = [filename];

		var bufferLoader = new BufferLoader($scope.audioCtx, noteUrls, function(buffer) {
			$scope.audioBuffers[note] = buffer[0];
			//$scope.playSound(buffer[0]);

			// Count audio buffer size and if it's complete then audio is finished loading
			var counter = 0;
			for (var i in $scope.audioBuffers) {
				counter++;
			};

			if (counter == $scope.notes.length) {
				$scope.audioLoaded = true;
				$scope.nextQuestion();
			};
		});

		bufferLoader.load();
	};

	$scope.loadAllAudio = function() {
		var format = Modernizr.audio.ogg ? 'ogg' : 'mp3';
		var octaves = [2,3];
		for (var i in octaves) {
			for (var j in $scope.notes) {
				var filename = EarTrainingService.getFilename($scope.notes[j]+octaves[i], format);
				$scope.loadAudio($scope.notes[j] + octaves[i], EarTrainingService.getFilename($scope.notes[j]+octaves[i], format));
				//$log.info(filename);
			}
		}
	}

	$scope.handleOptionSelect = function(option) {
		// Event tracking
		$window.ga('send', 'event', 'interval-training', 'click', 'answer buttons', option);

		$scope.numberOfClicks ++;

		if ($scope.selectedOptions.indexOf(option) == -1) {
			$scope.selectedOptions.push(option);
		}

		if ($scope.correctOption(option)) {
			$scope.score ++;

			// If the complete answer is chosen then move on to next question
			if ($scope.correctAnswer()) {
				$scope.updateSuccessMessage();
				$timeout(function() {
					$scope.nextQuestion();
				}, 500);
			}
		}

		$scope.scorePercent = Math.round($scope.score/$scope.numberOfClicks*100);
	};

	/*
	 * Check if option has been selected
	 */
	$scope.selectedOption = function(option) {
		return $scope.selectedOptions.indexOf(option) != -1;
	};

	/*
	 * Check if option is correct
	 */
	$scope.correctOption = function(option) {
		return $scope.currentInterval.split(' ').indexOf(option) != -1;
	};

	/*
	 * Check if the complete correct answer has been selected
	 */
	$scope.correctAnswer = function() {
		var counter = 0;
		for (var i in $scope.selectedOptions) {
			if ($scope.correctOption($scope.selectedOptions[i])) {
				counter ++;
			}
		}

		return $scope.currentInterval.split(' ').length == counter;
	};

	$scope.updateSuccessMessage = function() {
		$scope.successMessage = EarTrainingService.getRandomSuccessMessage();
		angular.element('#successMessage').fadeIn();
		$timeout(function() {
			angular.element('#successMessage').fadeOut();
		}, 1100);
	};

	$scope.nextQuestion = function() {
		// Load next question's audio
		$scope.numberOfQuestions ++;
		$scope.currentInterval = EarTrainingService.getRandomInterval();
		$scope.currentNotes = EarTrainingService.getIntervalNotes($scope.currentInterval);
		$scope.currentFiles = {
								'ogg':[$scope.getFilename($scope.currentNotes[0], 'ogg'), $scope.getFilename($scope.currentNotes[1], 'ogg')],
								'mp3':[$scope.getFilename($scope.currentNotes[0], 'mp3'), $scope.getFilename($scope.currentNotes[1], 'mp3')]
								};
		//$log.info($scope.currentNotes);
		//$log.info($scope.currentInterval);
		$scope.selectedOptions = [];
		//if ($scope.audioLoaded) {
			$scope.playNotes();
		//};
	};

	$scope.createNewAudioElements = function() {
		angular.element('audio').remove();

	};

	$scope.getFilename = function(note, format) {
		return EarTrainingService.getFilename(note,format);
	};

	// Set the frequency of the oscillator and start it running.
	$scope.startTone = function( frequency )
	{
	    var now = $scope.audioCtx.currentTime;
	    
	    $scope.oscillator.frequency.setValueAtTime(frequency, now);
	    
	    // Ramp up the gain so we can hear the sound.
	    // We can ramp smoothly to the desired value.
	    // First we should cancel any previous scheduled events that might interfere.
	    $scope.gainNode.gain.cancelScheduledValues(now);
	    // Anchor beginning of ramp at current value.
	    $scope.gainNode.gain.setValueAtTime($scope.gainNode.gain.value, now);
	    $scope.gainNode.gain.linearRampToValueAtTime(0.2, $scope.audioCtx.currentTime/* + 0.1*/); // Uncomment for smooth volume up
	}

	$scope.stopTone = function()
	{
	    var now = $scope.audioCtx.currentTime;
	    $scope.gainNode.gain.cancelScheduledValues(now);
	    $scope.gainNode.gain.setValueAtTime($scope.gainNode.gain.value, now);
	    $scope.gainNode.gain.linearRampToValueAtTime(0.0, $scope.audioCtx.currentTime + 1.0);
	}

	$scope.init = function() {
		//$scope.loadAllAudio();
		$scope.nextQuestion();

		// connect oscillator to gain node to speakers
		$scope.oscillator.connect($scope.gainNode);
		$scope.gainNode.connect($scope.audioCtx.destination);

		// set options for the oscillator
		$scope.oscillator.type = 'triangle';
		$scope.oscillator.start(0);
	}

	$scope.init();
}]);

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}
'use strict';

UIApp.service('EarTrainingService', function($log){
	var intervals = {
					'Unison' 		: 0,
					'Minor 2nd'		: 1,
					'Major 2nd' 	: 2,
					'Minor 3rd' 	: 3,
					'Major 3rd'		: 4,
					'Perfect 4th'	: 5,
					'Tritone'		: 6,
					'Perfect 5th'	: 7,
					'Minor 6th' 	: 8,
					'Major 6th'		: 9,
					'Minor 7th' 	: 10,
					'Major 7th'		: 11};

	var notes = ['C','C#','D','Eb','E','F','F#','G','G#','A','Bb','B'];
	var successMessages = [
							"Nice job!","Now you're cooking!","On fire!",
							"Bach called, he wants his skills back.",
							"Great!","Da best.",
							"Do you work here?",
							"Cause I'm freeeee, freee falling."
							];

	// http://www.phy.mtu.edu/~suits/notefreqs.html
	var frequencies = {
						'C2' : 65.41,
						'C#2': 69.30,
						'D2' : 73.42,
						'Eb2': 77.78,
						'E2' : 82.41,
						'F2' : 87.31,
						'F#2': 92.50,
						'G2' : 98.00,
						'G#2': 103.83,
						'A2' : 110.00,
						'Bb2': 116.54,
						'B2' : 123.47,
						'C3' : 130.81,
						'C#3': 138.59,
						'D3' : 146.83,
						'Eb3': 155.56,
						'E3' : 164.81,
						'F3' : 174.61,
						'F#3': 185.00,
						'G3' : 196.00,
						'G#3': 207.65,
						'A3' : 220.00,
						'Bb3': 233.08,
						'B3' : 246.94,
						'C4' : 261.63,
						'C#4': 277.18,
						'D4' : 293.66,
						'Eb4': 311.13,
						'E4' : 329.63,
						'F4' : 349.23,
						'F#4': 369.99,
						'G4' : 392.00,
						'G#4': 415.30,
						'A4' : 440.00,
						'Bb4': 466.16,
						'B4' : 493.88 
					};

	this.getIntervals = function() {
		return intervals;
	};

	/*
	 * Pick a random interval
	 */
	this.getRandomInterval = function() {
		var randomIndex = this.randomInt(1, 11);
		var counter = 1;
		for (var i in intervals) {
			if (counter == randomIndex) {
				return i;
				break;
			}
			counter ++;
		}
	}

	this.getIntervalNotes = function(interval) {
		var returnNotes = [];
		returnNotes[0] = this.getRandomNote();
		if (notes.indexOf(returnNotes[0]) + intervals[interval] < notes.length) {
			returnNotes[1] = notes[notes.indexOf(returnNotes[0]) + intervals[interval]];
		}
		else {
			returnNotes[1] = notes[notes.indexOf(returnNotes[0]) + intervals[interval] - notes.length];
		}

		// For now assume all intervals are ascending.
	 	// Figure out the octave number
	 	// If the second note is not in the same octave as the first then increase the octave
	 	if (notes.indexOf(returnNotes[0]) > notes.indexOf(returnNotes[1])) {
	 		returnNotes[1] += '4';
	 	}
	 	else {
	 		returnNotes[1] += '3';
	 	}

	 	returnNotes[0] += '3';
		return returnNotes;
	};

	this.getAllNotes = function() {
		return notes;
	}

	this.getFrequencies = function() {
		return frequencies;
	}

	/*
	 * Pick a random starting note
	 */
	 this.getRandomNote = function() {
	 	return notes[this.randomInt(0, notes.length - 1)];
	 };

	 this.getRandomSuccessMessage = function() {
	 	return successMessages[this.randomInt(0, successMessages.length - 1)];
	 };

	 this.getFilename = function(note, format) {
	 	return '/assets/audio/clean_' + note.toLowerCase().replace('#', 'sharp') + '.' + format;
	 }

	/*
	 * Returns random number between specified min/max
	 */
	this.randomInt = function(min, max) {
   		return Math.floor(Math.random()*(max-min+1)+min);
	};
});