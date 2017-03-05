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