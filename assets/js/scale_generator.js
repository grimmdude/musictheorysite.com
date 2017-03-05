//(C)2011 Garrett Grimm
//www.grimmdude.com
//www.musictheory.com/scale-generator
$(function() {
	function update_scale() {
			// show top nagger
			//setTimeout(function() {$('#top_nagger').fadeIn();}, 2000);
			
			//clear #display_scale div
			$('td.display').text('');
			
			//get starting note from dropdown
			var root_note = parseFloat($('#root').val());
			var scale_type = $('#scale_type').val();
			
			//iterate through the returned the_key object and display values in correct locations.
			$.each(scaleGen(root_note,scale_type), function(key, value) {//display the_scale
				if (key == 'the_scale') {//display the scale
					$('td#display_scale').append(value.join(', '));
				}
				if (key == 'pentatonic_scale') {//display the pentatonic scale
					$('td#display_pent_scale').append(value.join(', '));
				}
				if (key == 'diatonic_triad_names') {//display diatonic triad names
					$.each(this, function (key,value) {
						$('td#display_triad_names').append((key+1) + '. ' + value + ' &rarr;<br />');
					});
				}
				if (key == 'diatonic_triad_notes') {//display diatonic triad notes
					$.each(this, function (key,value) {
						$('td#display_triad_notes').append(value.join(', ') + '<br /> ');
					});
				}
				if (key == 'relative_major') {//display relative major
						$('td#display_relative').append('<a href=javascript:; title="Go to key">' + value + ' Major</a>');
				}
				if (key == 'relative_major_ref') {//setup relative minor link
					//pull up the relative key onclick; this needs to be here otherwise the changing link causes issue
					//first time i've ever called the a function from within that function.
					$('td#display_relative a').click( function () {
						$('form#scale_select #root').val(value);
						$('form#scale_select #scale_type').val('major');
						update_scale();
					});
				}
				if (key == 'relative_minor') {//display relative minor
						$('td#display_relative').append('<a href=javascript:; title="Go to key">' + value + ' Minor</a>');
				}
				if (key == 'relative_minor_ref') {//setup relative major link
					//pull up the relative key onclick; this needs to be here otherwise the changing link causes issue
					//first time i've ever called the a function from within that function.
					$('td#display_relative a').click( function () {
						$('form#scale_select #root').val(value);
						$('form#scale_select #scale_type').val('natural_minor');
						update_scale();
					});
				}
			});
		}
	
	//run scale updates on page load
	update_scale();

	//run scale updates when selectors are changed.
	$('form#scale_select').change( function() {
		update_scale();
	});
});	


function scaleGen(start, scale) {
	var notes, scales, triads, the_key, s, scale_type, notes_array, i, start_reference,
		total;
	
	//define notes
	notes = {
		sharps : ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
		flats : ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
	};
	
	//define scale types
	//these are intervals between notes, 1:half step, 2:whole step
	scales = {
		major : [2, 2, 1, 2, 2, 2],
		blues : [3, 2, 1, 1, 3],
		natural_minor : [2, 1, 2, 2, 1, 2],
		harmonic_minor : [2, 1, 2, 2, 1, 3],
		melodic_minor : [2, 1, 2, 2, 2, 2, 1, -2, -2, -1, -2, -2, -1, -2]
	};
	
	//define triad intervals
	triads = {
		major : [4, 3],
		minor : [3, 4],
		dim : [3, 3],
		aug : [4, 4]
	};
	
	//defaults to C Major if no arguments are passed
	start = (!start) ? 0 : start;
	scaleIntervals = (!scale) ? scales.major : scales[scale];
	
	if (scaleIntervals !== scales.major) {//specify which notes to use for this key.
		//specify which 'notes' array to use for minor keys
		notes_array = (start === 0 || start === 1 || start === 2 || start === 3 || start === 5 || start === 7 || start === 8 || start === 10) ? notes.flats : notes.sharps;
	} else {
		//specify which 'notes' array to use for major keys
		notes_array = (start === 1 || start === 3 || start === 5 || start === 8 || start === 10) ? notes.flats : notes.sharps;
	}
	
	//object to contain all results from this function, starting with the_scale
	the_key = {
		the_scale: [],
		//CREATE arrays of diatonic triads/names and sevenths
		diatonic_triad_notes : [],
		diatonic_triad_names : [],
		diatonic_sevenths_notes : [],
		scale_type : scale,
		root : notes_array[start],
		scale_intervals : scaleIntervals
	};
	
	s = the_key.the_scale;	//shortcut for accessing the_key.the_scale
	
	//function from http://www.guyfromchennai.com/?p=26 to find index of an array item
	Array.prototype.findIndex = function (value) {
		var ctr, i;
		ctr = "";
		for (i = 0; i < this.length; i++) {
			if (this[i] === value) {
				return i;
			}
		}
		return ctr;
	};
	
	//create new array from scale to reference each note from the starting note.  Used in loop below.
	start_reference = [];
	total = 0;
	
	//CREATE the_scale
	//use the start_reference array to pull notes from the notes array 
	//referencing from the start note.
	for (i = 0; i <= scaleIntervals.length; i++) {
		//add the current interval and add one by one to the start_reference array
		total += scaleIntervals[i];		
		start_reference.push(total);

		//minus 1 to account for the starting note
		var current_note = (i === 0) ? start : start + start_reference[i - 1];
		//loop back around the notes array if current>notes.length
		if (current_note >= notes_array.length) {
			current_note = current_note - 12;
		}
		s.push(notes_array[current_note]);
	}
	
	//POST SCALE CREATION OBJECT KEYS
	//GET relative_major/minor
	if (scaleIntervals !== scales.major) {
		the_key.relative_major = s[2]; 
		the_key.relative_major_ref = notes_array.findIndex(s[2]);
	}
	else {
		the_key.relative_minor = s[5];
		the_key.relative_minor_ref = notes_array.findIndex(s[5]);
	}
	
	//CREATE pentatnoic_scale
	if (scaleIntervals !== scales.major) {
		the_key.pentatonic_scale = [s[0], s[2], s[3], s[4], s[6]];
	} else {
		the_key.pentatonic_scale = [s[0], s[1], s[2], s[4], s[5]];
	}
	
	//use this function to create diatonic chords from the current note by stacking thirds
	//in the 'for' loop below.
	//ie: chord_note(1) gets root, chord_note(3) gets third etc.
	function chord_note(degree) {
		degree = degree - 1;	//minus one because i starts on 0.
		if (i + degree >= s.length) {
			return (i + degree) - s.length;
		} 
		else {
			return i + degree;
		}
	}
	
	//The slightly messy 'for' loop which creates all diatonic chords and chord names.
	for (i = 0; i < s.length; i++) {
		var third_extend, fifth_extend, M, m, dim;
		//create the diatonic_triad_notes array for this note
		the_key.diatonic_triad_notes.push([s[chord_note(1)], s[chord_note(3)], s[chord_note(5)]]);
		
		//create the diatonic_sevenths_notes array for this note
		the_key.diatonic_sevenths_notes.push([s[chord_note(1)], s[chord_note(3)], s[chord_note(5)], s[chord_note(7)]]);
		
		//if the third < first, or fifth < third add the length of the scale to get the extended number
		//so we can add/subract to get major/minor/dim/aug intervals.
		third_extend = (notes_array.findIndex(s[chord_note(3)]) < notes_array.findIndex(s[chord_note(1)])) ? notes_array.findIndex(s[chord_note(3)]) + notes_array.length : notes_array.findIndex(s[chord_note(3)]);
		fifth_extend = (notes_array.findIndex(s[chord_note(5)]) < third_extend ) ? notes_array.findIndex(s[chord_note(5)]) + notes_array.length : notes_array.findIndex(s[chord_note(5)]);

		//define the formulas for each triad type by using the notes_array index.  
		//return true if the formula matches.
		M = (third_extend - notes_array.findIndex(s[chord_note(1)]) === triads.major[0] && fifth_extend - third_extend === triads.major[1]) ? true : false;
		m = (third_extend - notes_array.findIndex(s[chord_note(1)]) === triads.minor[0] && fifth_extend - third_extend === triads.minor[1]) ? true : false;
		dim = (third_extend - notes_array.findIndex(s[chord_note(1)]) === triads.dim[0] && fifth_extend - third_extend === triads.dim[1]) ? true : false;
		aug = (third_extend - notes_array.findIndex(s[chord_note(1)]) === triads.aug[0] && fifth_extend - third_extend === triads.aug[1]) ? true : false;
		
		//define formulas for seventh chords
		M7 = (third_extend - notes_array.findIndex(s[chord_note(1)]) === triads.major[0] && fifth_extend - third_extend === triads.major[1]) ? true : false;
		Dom7 = (third_extend - notes_array.findIndex(s[chord_note(1)]) === triads.major[0] && fifth_extend - third_extend === triads.major[1]) ? true : false;
		m7 = (third_extend - notes_array.findIndex(s[chord_note(1)]) === triads.major[0] && fifth_extend - third_extend === triads.major[1]) ? true : false;
		
		//if a triad type is true add it to the diatonic_triad_names array
		if (M) { the_key.diatonic_triad_names.push(s[i] + 'M'); }
		if (m) { the_key.diatonic_triad_names.push(s[i] + 'm'); }
		if (dim) { the_key.diatonic_triad_names.push(s[i] + 'dim'); }
		if (aug) { the_key.diatonic_triad_names.push(s[i] + 'aug'); }
		
		//raw triad indexes with number adjustment
		//console.log(notes_array.findIndex(s[chord_note(1)])+','+notes_array.findIndex(s[chord_note(3)])+','+notes_array.findIndex(s[chord_note(5)]));
		
		//triad note indexes with extended numbers
		//console.log(notes_array.findIndex(s[chord_note(1)]) + ', ' + third_extend + ', ' + fifth_extend);
	}
	//console.log("Thanks for using MusicTheorySite.com Scale Generator!");
	//console.log(the_key);
	return the_key;
}