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