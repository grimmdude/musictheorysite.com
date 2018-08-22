var Keys = {
	// MAJOR KEYS
	'C Major': ['C', 'Cmaj7', 'Dm', 'Dm7', 'Em', 'Em7', 'F', 'Fmaj7', 'G', 'G7', 'Am', 'Am7', 'Bdim'],

	'C# Major': ['C#', 'C#maj7', 'D#m', 'D#m7', 'E#m', 'E#m7', 'F#', 'F#maj7', 'G#', 'G#7', 'A#m', 'A#m7', 'B#dim'],

	'Db Major': ['Db', 'Dbmaj7', 'Ebm', 'Ebm7', 'Fm', 'Fm7', 'Gb', 'Gbmaj7', 'Ab', 'Ab7', 'Bbm', 'Bbm7', 'Cdim'],

	'D Major': ['D', 'Dmaj7', 'Em', 'Em7', 'F#m', 'F#m7', 'G', 'Gmaj7', 'A', 'A7', 'Bm', 'Bm7', 'C#dim'],

	'D# Major': ['D#', 'D#maj7', 'E#m', 'E#m7', 'F##m', 'F##m7', 'G#', 'G#maj7', 'A#', 'A#7', 'B#m', 'B#m7', 'C##dim'],

	'Eb Major': ['Eb', 'Ebmaj7', 'Fm', 'Fm7', 'Gm', 'Gm7', 'Ab', 'Abmaj7', 'Bb', 'Bb7', 'Cm', 'Cm7', 'Ddim'],

	'E Major': ['E', 'Emaj7', 'F#m', 'F#m7', 'G#m', 'G#m7', 'A', 'Amaj7', 'B', 'B7', 'C#m', 'C#m7', 'D#dim'],

	'F Major': ['F', 'Fmaj7', 'Gm', 'Gm7', 'Am', 'Am7', 'Bb', 'Bbmaj7', 'C', 'C7', 'Dm', 'Dm7', 'Edim'],

	'F# Major': ['F#', 'F#maj7', 'G#m', 'G#m7', 'A#m', 'A#m7', 'B', 'Bmaj7', 'C#', 'C#7', 'D#m', 'D#m7', 'E#dim'],

	'Gb Major': ['Gb', 'Gbmaj7', 'Abm', 'Abm7', 'Bbm', 'Bbm7', 'Cb', 'Cbmaj7', 'Db', 'Db7', 'Ebm', 'Ebm7', 'Fdim'],

	'G Major': ['G', 'Gmaj7', 'Am', 'Am7', 'Bm', 'Bm7', 'C', 'Cmaj7', 'D', 'D7', 'Em', 'Em7', 'F#dim'],

	'G# Major': ['G#', 'G#maj7', 'A#m', 'A#m7', 'B#m', 'B#m7', 'C#', 'C#maj7', 'D#', 'D#7', 'E#m', 'E#m7', 'F##dim'],

	'Ab Major': ['Ab', 'Abmaj7', 'Bbm', 'Bbm7', 'Cm', 'Cm7', 'Db', 'Dbmaj7', 'Eb', 'Eb7', 'Fm', 'Fm7', 'Gdim'],

	'A Major': ['A', 'Amaj7', 'Bm', 'Bm7', 'C#m', 'C#m7', 'D', 'Dmaj7', 'E', 'E7', 'F#m', 'F#m7', 'G#dim'],

	'A# Major': ['A#', 'A#maj7', 'B#m', 'B#m7', 'C##m', 'C##m7', 'D#', 'D#maj7', 'E#', 'E#7', 'F##m', 'F##m7', 'G##dim'],

	'Bb Major': ['Bb', 'Bbmaj7', 'Cm', 'Cm7', 'Dm', 'Dm7', 'Eb', 'Ebmaj7', 'F', 'F7', 'Gm', 'Gm7', 'Adim'],

	'B Major': ['B', 'Bmaj7', 'C#m', 'C#m7', 'D#m', 'D#m7', 'E', 'Emaj7', 'F#', 'F#7', 'G#m', 'G#m7', 'A#dim'],
	
	'C Minor': ['Eb', 'Ebmaj7', 'Fm', 'Fm7', 'Gm', 'Gm7', 'G', 'G7', 'Ab', 'Abmaj7', 'Bb', 'Bb7', 'Cm', 'Cm7', 'Ddim'],
	
	'G Minor': ['Bb', 'Bbmaj7', 'Cm', 'Cm7', 'Dm', 'Dm7', 'D', 'D7', 'Eb', 'Ebmaj7', 'F', 'F7', 'Gm', 'Gm7', 'Adim'],
	
	'D Minor': ['F', 'Fmaj7', 'Gm', 'Gm7', 'Am', 'Am7', 'A', 'A7', 'Bb', 'Bbmaj7', 'C', 'C7', 'Dm', 'Dm7', 'Edim'],
	
	'A Minor': ['C', 'Cmaj7', 'Dm', 'Dm7', 'Em', 'Em7', 'E', 'E7', 'F', 'Fmaj7', 'G', 'G7', 'Am', 'Am7', 'Bdim'],
	
	'E Minor': ['G', 'Gmaj7', 'Am', 'Am7', 'Bm', 'Bm7', 'B', 'B7', 'C', 'Cmaj7', 'D', 'D7', 'Em', 'Em7', 'F#dim'],
	
	'B Minor': ['D', 'Dmaj7', 'Em', 'Em7', 'F#m', 'F#m7', 'F#', 'F#7', 'G', 'Gmaj7', 'A', 'A7', 'Bm', 'Bm7', 'C#dim'],
	
	'F# Minor': ['A', 'Amaj7', 'Bm', 'Bm7', 'C#m', 'C#m7', 'C#', 'C#7', 'D', 'Dmaj7', 'E', 'E7', 'F#m', 'F#m7', 'G#dim'],
	
	'C# Minor': ['E', 'Emaj7', 'F#m', 'F#m7', 'G#m', 'G#m7', 'G#', 'G#7', 'A', 'Amaj7', 'B', 'B7', 'C#m', 'C#m7', 'D#dim'],
	
	'Db Minor': ['E', 'Emaj7', 'F#m', 'F#m7', 'G#m', 'G#m7', 'G#', 'G#7', 'A', 'Amaj7', 'B', 'B7', 'C#m', 'C#m7', 'D#dim'],
	
	'Ab Minor': ['B', 'Bmaj7', 'C#m', 'C#m7', 'D#m', 'D#m7', 'D#', 'D#7', 'E', 'Emaj7', 'F#', 'F#7', 'G#m', 'G#m7', 'A#dim'],
	
	'Eb Minor': ['Gb', 'Gbmaj7', 'Abm', 'Abm7', 'Bbm', 'Bbm7', 'Bb', 'Bb7', 'Cb', 'Cbmaj7', 'Db', 'Db7', 'Ebm', 'Ebm7', 'Fdim'],
	
	'Bb Minor': ['Db', 'Dbmaj7', 'Ebm', 'Ebm7', 'Fm', 'Fm7', 'F', 'F7', 'Gb', 'Gbmaj7', 'Ab', 'Ab7', 'Bbm', 'Bbm7', 'Cdim'],
	
	'F Minor': ['Ab', 'Abmaj7', 'Bbm', 'Bbm7', 'Cm', 'Cm7', 'C', 'C7', 'Db', 'Dbmaj7', 'Eb', 'Eb7', 'Fm', 'Fm7', 'Gdim']
};

// Given a set of keys to search, and a set of chords to search for
// return the key with the most chords in it
// docs: http://documentcloud.github.com/underscore/
function topKey(keys, chords) {
	var counts = {};
	var result = [];

	// for each key, count how many chords of the key match the chords the user chose
	_(keys).each(function(values, key, list) {
		counts[key] = _(values).chain().intersection(this.chords).size().value();
	}, {chords: chords});

	// results is now a Hash of Key => count pairs, e.g. {'A Major': 0, 'Bb Major': 5, ...}
	// get the highest count
	var max = _(counts).max();

	// Add the name of the key if its count is = to the max
	_(counts).each(function(value, key, list) {
		if (value === this.max) {
			result.push(key);
		}
	}, {max: max});

	return result; // result is an array of keynames e.g. ['A Major', 'G Major']
}

//  the function that finds the key
function namethatkey() {
	var chords = jQuery.makeArray(jQuery('.selected').map(function() {
		return jQuery(this).html();
	}));

	var topkeys = topKey(Keys, chords);
	
	jQuery('#result').css('display', 'block');
	// jQuery('#thekey').html("A song with chords: " + chords.join(", ") + " is most likely in the key of");
	// document.getElementById('keyletter').innerHTML = topkeys.join("<br /><span class='or'>or</span><br /> ");
	
	// Circle of Fifth Highlighting
	// Remove all selected_slice/selected_slice_minor/selected_key_text classes to reset circle and ie results table.
	jQuery('.selected_slice').removeClass('selected_slice');
	jQuery('.selected_slice_minor').removeClass('selected_slice_minor');
	jQuery('.selected_key_text').removeClass('selected_key_text');

	_(topkeys).each(function(item,index) {
		// Give the resulting Major ids .selected_slice in the CIRCLE OF FIFTHS.
		var id_major = item.replace(" ", "_").replace("#", "sharp");
		jQuery('#'+id_major+' .pie').addClass('selected_slice');
		
		// Give the resulting Minor ids .selected_slice_minor in the CIRCLE OF FIFTHS.
		var id_minor = item.replace(" ", "_").replace("#", "sharp");
		jQuery('#'+id_minor+' .pie_minor').addClass('selected_slice_minor');
		
		// Give the resulting Major ids .selected_slice in the IE RESULTS TABLE.
		var id_ie_major = item.replace(" ", "_").replace("#", "sharp").replace('Major', "");
		jQuery('#ie_'+id_ie_major+'Major').addClass('selected_slice');
		
		// Give the resulting Minor ids .selected_slice_minor in the IE RESULTS TABLE.
		var id_ie_minor = item.replace(" ", "_").replace("#", "sharp").replace('Minor', "");
		jQuery('#ie_'+id_ie_minor+'Minor').addClass('selected_slice_minor');
		
		// Highlight circle labels by adding .selected_key_text
		var id_selected_text = item.replace(" ", "_").replace("#", "sharp");
		id_selected_text += '-label';
		jQuery('#'+id_selected_text).addClass('selected_key_text');
	});
	
	// Remove all selected_slice/selected_slice_minor/selected_key_text classes if nothing is selected
	if (jQuery('#chord_selector td.selected').length == 0) {
		jQuery('.selected_slice').removeClass('selected_slice');
		jQuery('.selected_slice_minor').removeClass('selected_slice_minor');
		jQuery('.selected_key_text').removeClass('selected_key_text');
	}
}

// Setup events after dom is loaded
jQuery(function() {
	
	// show top nagger
	//setTimeout(function() {$('#top_nagger').fadeIn();}, 2000);

	// Disable popups for now
	jQuery('#key_labels a').attr('href','javascript:;');
 
	//  jquery slider toggle for #instructions
	jQuery('#toggle_instr').click(function() {
		jQuery('#instructions').slideToggle('medium', function() { });
	});

	//  apply .odd to every other table row for readability
	jQuery('#chord_selector tr:odd').addClass('odd');

	//  apply .highlight to each td
	jQuery('#chord_selector td').addClass('highlight');

	//  toggle when clicked to .selected
	jQuery('#chord_selector td').click(function () {
		jQuery(this).toggleClass('selected');
		namethatkey();

		ga('send', 'event', 'key-identifier', 'click', 'chord', jQuery(this).text());
	});

	//  click to remove .selected and from chord table (clears selections)
	jQuery('#clear_selected').click(function() {
		jQuery('#chord_selector td').removeClass('selected');
		namethatkey();

		ga('send', 'event', 'key-identifier', 'click', 'clear');
	});
	
	//  Add .jtab to all <td> within #diatonic_chords div
	jQuery('#diatonic_chords td').addClass('jtab');
	
	//  Display IE nag if on IE
	if (navigator.appName == 'Microsoft Internet Explorer') {
		jQuery('#ie_nag').css('display', 'block');
		}
		
	//  Don't circle of fifths if browser is not IE, otherwise display it.
	if (navigator.appName != 'Microsoft Internet Explorer') {
		jQuery('#circle_of_fifths').css('display', 'block');
		}
		else{
		jQuery('#ie_results').css('display', 'block');
		}
});
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
/**
* Copyright 2013 Garrett Grimm
* http://grimmdude.com
*
*/

// Setup events after dom is loaded
$(function () {
	// register tooltip for header
	//$('#header h1').tipsy({gravity:'w', fade:true, delayOut:2000});
	
	// show top nagger
	//setTimeout(function() {$('#top_nagger').fadeIn();}, 2000);
	
	// object to hold any user saved chords
	var user_stored_chords = {};
	
	var Chords = {
		//Major Chords
		'C' : ['C','E','G'],
		'Db' : ['Db','F','Ab'],
		'D' : ['D','F#','A'],
		'Eb' : ['Eb','G','Bb'],
		'E' : ['E','Ab','B'],
		'F' : ['F','A','C'],
		'F#' : ['F#','Bb','Db'],
		'Gb' : ['Gb','Bb','Ab'],
		'G' : ['G','B','D'],
		'Ab' : ['Ab','C','Eb'],
		'A' : ['A','Db','E'],
		'Bb' : ['Bb','D','F'],
		'B' : ['B','Eb','F#'],
		//Minor Chords
		'Cm' : ['C','Eb','G'],
		'Dbm' : ['Db','E','Ab'],
		'Dm' : ['D','F','A'],
		'Ebm' : ['Eb','F#','Bb'],
		'Em' : ['E','G','B'],
		'Fm' : ['F','Ab','C'],
		'F#m' : ['F#','A','Db'],
		'Gm' : ['G','Bb','D'],
		'Abm' : ['Ab','B','Eb'],
		'Am' : ['A','C','E'],
		'Bbm' : ['Bb','Db','F'],
		'Bm' : ['B','D','F#'],
		//Major 7 Chords
		'CM7' : ['C','E','G','B'],
		'DbM7' : ['Db','F','Ab','C'],
		'DM7' : ['D','F#','A','Db'],
		'EbM7' : ['Eb','G','Bb','D'],
		'EM7' : ['E','Ab','B','Eb'],
		'FM7' : ['F','A','C','E'],
		'F#M7' : ['F#','Bb','Db','E#'],
		'GbM7' : ['Gb','Bb','Ab','F'],
		'GM7' : ['G','B','D','F#'],
		'AbM7' : ['Ab','C','Eb','G'],
		'AM7' : ['A','Db','E','Ab'],
		'BbM7' : ['Bb','D','F','A'],
		'BM7' : ['B','Eb','F#','Bb','Bb'],
		//Minor 7 Chords
		'Cm7' : ['C','Eb','G','Bb'],
		'Dbm7' : ['Db','E','Ab','B'],
		'Dm7' : ['D','F','A','C'],
		'Ebm7' : ['Eb','F#','Bb','Db'],
		'Em7' : ['E','G','B','D'],
		'Fm7' : ['F','Ab','C','Eb'],
		'F#m7' : ['F#','A','Db','E'],
		'Gm7' : ['G','Bb','D','F'],
		'Abm7' : ['Ab','B','Eb','F#'],
		'Am7' : ['A','C','E','G'],
		'Bbm7' : ['Bb','D','F','Ab'],
		'Bm7' : ['B','D','F#','A'],
		//Dominant 7 Chords
		'C7' : ['C','E','G','Bb'],
		'Db7' : ['Db','F','Ab','B'],
		'D7' : ['D','F#','A','C'],
		'Eb7' : ['Eb','G','Bb','Db'],
		'E7' : ['E','Ab','B','D'],
		'F7' : ['F','A','C','Eb'],
		'F#7' : ['F#','Bb','Db','E'],
		'Gb7' : ['Gb','Bb','Ab','E'],
		'G7' : ['G','B','D','F'],
		'Ab7' : ['Ab','C','Eb','Gb','F#'],
		'A7' : ['A','Db','E','G'],
		'Bb7' : ['Bb','D','F','Ab'],
		'B7' : ['B','Eb','F#','A'],
		//Add9 Chords
		'Cadd9' : ['C','D','E','G'],
		'Dbadd9' : ['Db','Eb','F','Ab'],
		'Dadd9' : ['D','E','F#','A'],
		'Ebadd9' : ['Eb','F','G','Bb'],
		'Eadd9' : ['E','F#','Ab','B'],
		'Fadd9' : ['F','G','A','C'],
		'F#add9' : ['F#','Ab','Bb','Db'],
		'Gbadd9' : ['Gb','Ab','Bb','Db'],
		'Gadd9' : ['G','A','B','D'],
		'Abadd9' : ['Ab','Bb','C','Eb'],
		'Aadd9' : ['A','B','Db','E'],
		'Bbadd9' : ['Bb','C','D','F'],
		'Badd9' : ['B','Db','Eb','F#'],
		//6 Chords
		'C6' : ['C','E','G','A'],
		'Db6' : ['Db','F','Ab','Bb'],
		'D6' : ['D','F#','A','B'],
		'Eb6' : ['Eb','G','Bb','C'],
		'E6' : ['E','Ab','B','Db'],
		'F6' : ['F','A','C','D'],
		'F#6' : ['F#','Bb','Db','Eb'],
		'Gb6' : ['Gb','Bb','Db','Eb'],
		'G6' : ['G','B','D','E'],
		'Ab6' : ['Ab','C','Eb','F'],
		'A6' : ['A','Db','E','F#'],
		'Bb6' : ['Bb','D','F','G'],
		'B6' : ['B','Eb','F#','Ab'],
		//Dominant 9 Chords
		'C9' : ['C','E','G','Bb','D'],
		'Db9' : ['Db','F','Ab','B','Eb'],
		'D9' : ['D','F#','A','C','E'],
		'Eb9' : ['Eb','G','Bb','Db','F'],
		'E9' : ['E','Ab','B','D','F#'],
		'F9' : ['F','A','C','Eb','G'],
		'F#9' : ['F#','Bb','Db','E','Ab'],
		'Gb9' : ['Gb','Bb','Ab','E','Ab'],
		'G9' : ['G','B','D','F','A'],
		'Ab9' : ['Ab','C','Eb','Gb','F#','Bb'],
		'A9' : ['A','Db','E','G','B'],
		'Bb9' : ['Bb','D','F','Ab','C'],
		'B9' : ['B','Eb','F#','A','Db']
		//Bb instead of A#, Eb instead of D#, Db instead of C#, Ab instead of G#
	};

	// Given a set of chords and some notes, find all chords with exact or partial matches for notes
	// Example:
	//   topChord(Chords, ['G', 'B', 'D']) => {'exact': ['G'], 'partial': ['GM7', 'Em7', 'G7', ...]}

	function topChord(chords, notes) {
		var result = {'exact': [], 'partial': []};
		var minMatches = 2; // minimum number of notes in a chord for a 'partial' match

	 	// for each note, count how many notes of the chord match the notes the user chose
	 	_(chords).each(function(values, chord, list) {
	   		// how many matching notes are there
	   		var numNotes = _(this.notes).size();
	   		var matchCount = _(values).chain().intersection(this.notes).size().value();
	   		if (numNotes === matchCount) {
	     		// this chord has all of our notes
	     		if (_(values).size() === numNotes) {
	       			// we have an exact match
	       			result.exact.push(chord);
				}
				else if (matchCount >= minMatches) {
					// we have a partial match
					result.partial.push(chord);
				}
			}
		}, {notes: notes});

		return result; // result is an object e.g. {'exact': ['G'], 'partial': ['GM7']}
	}

	//  the function that finds the key
	function namethatchord() {
		var selected_notes, unique_selected_notes, finalResults;
		
		selected_notes = $.makeArray($('.selected').map(function() {
			return $(this).html();
		}));

		unique_selected_notes = _.uniq(selected_notes);
		
		finalResults = topChord(Chords, unique_selected_notes);

		//Print the resulting chords with top matches
		$('#chord_results').html(finalResults.partial.join(', '));

		//Print the resulting chords with exact matches
		$('#exact_results').html(finalResults.exact.join(', '));

		//If no notes are .selected then show nothing in #chord_results area
		if (selected_notes.length === 0) {
			$('#chord_results').html('');
		}

		//Print chosen notez
		$('#chosen_notes').html(selected_notes.join(', '));
	}

	// add fret number class to each note
	for (i = 0; i <= 17; i++) {
		var fret = 'fret_' + i;
		$('#e_notes a').eq(i).addClass(fret);
		$('#B_notes a').eq(i).addClass(fret);
		$('#G_notes a').eq(i).addClass(fret);
		$('#D_notes a').eq(i).addClass(fret);
		$('#A_notes a').eq(i).addClass(fret);
		$('#E_notes a').eq(i).addClass(fret);
	}
	
	// add note classes by innerHTML to each note
	$('#note_selectors a').each(function() {
		$(this).addClass($(this).text());
	});
	
	// add href="javascript:;" to each of the note selectors
	$('#note_selectors a').attr('href', 'javascript:;');
	
	// Select contents of url box on click
	$('#frets_url, #embed_code').click(function() {
		$(this).select();
	});

	//  toggle when clicked to .selected and run namethatchord()
	$('#note_selectors a').click(function () {
		// Only allow clicks if not embedded
		if (!url_params.hasOwnProperty('embed')) {
			//only allow one .selected per string at a time
			if ($(this).siblings('.selected').length >=1) {
				$(this).siblings('.selected').removeClass('selected');
			}

			//add or remove .selected
			$(this).toggleClass('selected');

			//if notes are selected then enable the chord storing button
			if ($('.selected').length) {
				$('#store_chord').removeClass('disabled');
			}
			else {
				$('#store_chord').addClass('disabled');
			}

			//create url for these frets
			$('#frets_url').val(build_frets_url());
			
			//create embed code
			$('#embed_code').val(build_embed_code());

			//run the function that finds the chords
			namethatchord();

			ga('send', 'event', 'namethatchord', 'click', 'note', jQuery(this).attr('class').replace(' selected', ''));
		}
		
		if ((url_params.hasOwnProperty('embed') && url_params.hasOwnProperty('listen')) || !url_params.hasOwnProperty('embed')) {
			// load sounds when note is clicked
			var note = $(this).attr('class').split(' ')[0];
			load_note_audio(note);
		}
	});

	// clear all selections on click
	$('#clear_selections').click(function () {
		clear_notes();
		ga('send', 'event', 'namethatchord', 'click', 'clear notes');
	});

	// store chord
	$('#store_chord').click(function() {
		if(!$('#store_chord').is('.disabled')) {
			
			// If this is the first stored chord remove the placeholder paragraph
			if (_.size(user_stored_chords) === 0) {
				$('#stored_chords p').remove();
			}
			
			// add new entry in user_stored_chords object
			var next_entry_no = _.size(user_stored_chords) + 1;
			user_stored_chords[next_entry_no] = {};
			user_stored_chords[next_entry_no]['frets'] = {};
			user_stored_chords[next_entry_no]['notes'] = [];
		
			$('.selected').each(function() {
				var string = $(this).parent().attr('id');
				var fret = $(this).attr('class').split(' ')[1];	
				var note = $(this).attr('class').split(' ')[2];
				user_stored_chords[next_entry_no]['frets'][string] = fret;
				user_stored_chords[next_entry_no]['notes'].push(note);
			});
		
			// Add a bootstrap split button for this stored chord
			$('#stored_chords').append($('<div />', {id: 'button_group_'+next_entry_no, style: 'float:left;'}).addClass('btn-group'));
			
			$('<button />', {id: next_entry_no+'_stored', text: next_entry_no}).addClass('btn btn-primary stored_box').appendTo('#button_group_'+next_entry_no);
			//$('<button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>').appendTo('#button_group_'+next_entry_no);
			//$('<ul />', {class: 'dropdown-menu'}).appendTo('#button_group_'+next_entry_no)
			//	.append('<li><a href="javascript:;">Play</a></li>')
			//	.append('<li><a href="javascript:;">Remove</a></li>');
		
			// temporarily disable save button
			$('#store_chord').addClass('disabled');

			ga('send', 'event', 'namethatchord', 'click', 'store chord');
		}		
	});
	
	// asign event to stored chords link
	$('#stored_chords').delegate('.stored_box', 'click', function() {
		var this_chord = user_stored_chords[parseInt($(this).attr('id'))];
		
		// first clear the selected notes
		clear_notes();
		
		// populate the chord graph with this chord
		_.each(this_chord, function(value, key) {
			// for each fret select it on the guitar
				if (key == 'frets') {
					_.each(value, function(fret, string) {
						$('#'+string).children('a.'+fret).addClass('selected');
					});
				}
		});
		//create url for these frets
		$('#frets_url').val(build_frets_url());
		namethatchord();
	});
	
	$('#chord_listen').click(function() {
		if(!$(this).is('.disabled')) {
			$('.selected').each(function() {
				var note = $(this).attr('class').split(' ')[0];
				$('audio#'+note).trigger('load');
				$('audio#'+note).trigger('play');
			});

			ga('send', 'event', 'namethatchord', 'click', 'listen to chord');
		}
	});
	
	// Ajax loading image
	$('#ajaxload').ajaxStart(function() {
		$(this).show();
		$('#chord_listen').addClass('disabled');
	});
	
	$('#ajaxload').ajaxStop(function() {
		$(this).hide();
		$('#chord_listen').removeClass('disabled');
	});
	
	// If there are any fret values in the url then select those notes by default and load audio
	if (typeof(url_params) == 'object') {
		$.each(url_params, function(key, value) {
			if ($.inArray(key, ['E','A','D','G','B','e']) != -1) {
				$('#'+key+'_notes').find('.fret_'+value).addClass('selected');
				var note = $('#'+key+'_notes').find('.fret_'+value).attr('class').split(' ')[0];
				if (!url_params.hasOwnProperty('embed')) {
					load_note_audio(note);
				}
			}
		});
		
		//create url for these frets
		$('#frets_url').val(build_frets_url());
		namethatchord();
	}
	
	function clear_notes() {
		$('#note_selectors a').removeClass('selected');
		$('#store_chord').addClass('disabled');
		$('#frets_url').val('');
		$('#embed_code').val('');
		namethatchord();
	}
	
	function check_saved_chords(user_stored_chords) {
		// this function needs to check the current selected notes against any saved chords and return any saved chord that matches.
		
		//for each fret, get the string and fret number and see if that exists in any of the stored chords
	}
	
	function load_note_audio(note) {
		// Define audio type to use per browser (firefox needs .ogg)
		//var audio_type = $.browser.mozilla ? '.ogg' : '.mp3';
		
		var audio_type = '.mp3';

		// if audio already exists don't worry about loading it
		if (!$('audio#'+note).length) {
			$.ajax({
		        url: "/assets/audio/clean_"+note+audio_type,
		        success: function() {
					$('<audio/>', {
						id: note,
						src: "/assets/audio/clean_"+note+audio_type,
						preload: 'true'
					}).appendTo('#audio');
		        }
		    });
		}
	}
	
	function build_frets_url() {
		var url = 'http://musictheorysite.com/namethatchord/?frets';
		var string, fret;
		$('.selected').each(function() {
			string = $(this).parent().attr('id').substr(0,1);
			fret = +$(this).index();
			url += '&'+string+'='+fret;
		});
		return url;
	}
	
	function build_embed_code() {
		return "<iframe width='650' height='235' scrolling='no' src='"+build_frets_url()+"&embed' frameborder='0' style='overflow:hidden'></iframe>";
	}
});