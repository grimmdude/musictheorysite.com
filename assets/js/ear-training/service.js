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