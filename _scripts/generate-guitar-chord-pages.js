var fs = require('fs');

var keys = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'C'];
var types = ['m', 'm6', 'maj7', 'm7', '7', '9', '13', 'sus2', 'sus4', 'add9', 'aug', 'dim', 'dim7'];
var template = fs.readFileSync(__dirname + '/guitar-chord-page-template.html').toString();

keys.forEach(function(key) {
	types.forEach(function(type) {
		fs.writeFile(__dirname + '/../guitar-chord-chart/standard/' + key.replace('#', 'sharp') + type + '.html', template.replace(/\{chord\}/g, key + type), function(err) {
			if (err) return console.log(err);
		});
	});
});