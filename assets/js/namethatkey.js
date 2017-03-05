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