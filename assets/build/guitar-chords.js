(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var tonal_chord = require('tonal-chord');
var tonal_fretboard = require('tonal-fretboard');

angular.module('guitarChordChart', [], function($interpolateProvider) {
		$interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

}).controller('GuitarChordController', ['$window', '$scope', '$log', function ($window, $scope, $log) {
	$scope.chordName = '';
	$scope.chordShapes = [];

	$scope.updateChord = function() {
		$('#chords-container').empty();

		if ($scope.chordName) {
			$scope.chordShapes = tonal_fretboard.chordShapes('guitar', tonal_chord.notes($scope.chordName), 0, 24, 4);
			// Reverse so they're in order on page.
			//$scope.chordShapes.reverse();

			//$log.info($scope.chordShapes);
			$scope.chordShapes.forEach(function(shape) {
				var div = $('#chords-container').append('<div></div>');
				var paper = Raphael(div[0], 160, 140);
				var chord = new ChordBox(paper, 30, 30);

				// Position should be lowest played fret.
				// Basically a Math.min() implementation but with considerations for null/Array values.
				var position = shape.reduce(function(accum, value) {
					if (Array.isArray(value)) value = value[0];
					return value && value < accum ? value : accum;
				}, 100);

				// If position is > 0 then dial it back one notch so lower frets don't appear as open ones.
				position = position ? position - 1 : position;

				chord.setChord(shape.reverse().map(function(item, index) {
					if (Array.isArray(item)) {
						var fret_number = item[0] - position;

					} else if (item) {
						var fret_number = item - position;

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
}]);


},{"tonal-chord":5,"tonal-fretboard":10}],2:[function(require,module,exports){
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.IntervalNotation=t.IntervalNotation||{})}(this,function(t){"use strict";function n(t,n){if("string"!=typeof t)return null;var e=d.exec(t);if(!e)return null;var r={num:+(e[3]||e[8]),q:e[4]||e[6]};r.dir="-"===(e[2]||e[7])?-1:1;var u=(r.num-1)%7;return r.simple=u+1,r.type=p[u],r.alt=f(r.type,r.q),r.oct=Math.floor((r.num-1)/7),r.size=r.dir*(c[u]+r.alt+12*r.oct),!1!==n&&"M"===r.type&&"P"===r.q?null:r}function e(t){return p[(t-1)%7]}function r(t){return-1===t?"-":""}function u(t,n){return t+7*n}function o(t,n,e,o){return a(t,n)+r(o)+u(t,e)}function i(t,n,e,o){return r(o)+u(t,e)+a(t,n)}function f(t,n){var r="number"==typeof t?e(t):t;return"M"===n&&"M"===r?0:"P"===n&&"P"===r?0:"m"===n&&"M"===r?-1:/^A+$/.test(n)?n.length:/^d+$/.test(n)?"P"===r?-n.length:-n.length-1:null}function l(t,n){return Array(Math.abs(n)+1).join(t)}function a(t,n){var r="number"==typeof t?e(Math.abs(t)):t;return 0===n?"M"===r?"M":"P":-1===n&&"M"===r?"m":n>0?l("A",n):n<0?l("d","P"===r?n:n+1):null}var d=new RegExp("^(?:(([-+]?)(\\d+)(d{1,4}|m|M|P|A{1,4}))|((AA|A|P|M|m|d|dd)([-+]?)(\\d+)))$"),c=[0,2,4,5,7,9,11],p="PMMPPMM";t.parse=n,t.type=e,t.shorthand=o,t.build=i,t.qToAlt=f,t.altToQ=a});


},{}],3:[function(require,module,exports){
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.NoteParser=t.NoteParser||{})}(this,function(t){"use strict";function n(t,n){return Array(n+1).join(t)}function r(t){return"number"==typeof t}function e(t){return"string"==typeof t}function u(t){return void 0!==t}function c(t,n){return Math.pow(2,(t-69)/12)*(n||440)}function o(){return b}function i(t,n,r){if("string"!=typeof t)return null;var e=b.exec(t);if(!e||!n&&e[4])return null;var u={letter:e[1].toUpperCase(),acc:e[2].replace(/x/g,"##")};u.pc=u.letter+u.acc,u.step=(u.letter.charCodeAt(0)+3)%7,u.alt="b"===u.acc[0]?-u.acc.length:u.acc.length;var o=A[u.step]+u.alt;return u.chroma=o<0?12+o:o%12,e[3]&&(u.oct=+e[3],u.midi=o+12*(u.oct+1),u.freq=c(u.midi,r)),n&&(u.tonicOf=e[4]),u}function f(t){return r(t)?t<0?n("b",-t):n("#",t):""}function a(t){return r(t)?""+t:""}function l(t,n,r){return null===t||void 0===t?null:t.step?l(t.step,t.alt,t.oct):t<0||t>6?null:C.charAt(t)+f(n)+a(r)}function p(t){if((r(t)||e(t))&&t>=0&&t<128)return+t;var n=i(t);return n&&u(n.midi)?n.midi:null}function s(t,n){var r=p(t);return null===r?null:c(r,n)}function d(t){return(i(t)||{}).letter}function m(t){return(i(t)||{}).acc}function h(t){return(i(t)||{}).pc}function v(t){return(i(t)||{}).step}function g(t){return(i(t)||{}).alt}function x(t){return(i(t)||{}).chroma}function y(t){return(i(t)||{}).oct}var b=/^([a-gA-G])(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)\s*$/,A=[0,2,4,5,7,9,11],C="CDEFGAB";t.regex=o,t.parse=i,t.build=l,t.midi=p,t.freq=s,t.letter=d,t.acc=m,t.pc=h,t.step=v,t.alt=g,t.chroma=x,t.oct=y});


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tonalPitch = require('tonal-pitch');
var tonalTranspose = require('tonal-transpose');
var tonalDistance = require('tonal-distance');

/**
 * This module implements utility functions related to array manipulation, like:
 * `map`, `filter`, `shuffle`, `sort`, `rotate`, `select`
 *
 * All the functions are _functional friendly_ with target object as last
 * parameter and currified. The sorting functions understand about pitch
 * heights and interval sizes.
 *
 * One key feature of tonal is that you can represent lists with arrays or
 * with space separated string of elements. This module implements that
 * functionallity.
 *
 * @module array
 */
function split (sep) {
  return function (o) {
    return o === undefined ? []
      : Array.isArray(o) ? o
      : typeof o === 'string' ? o.trim().split(sep) 
      : [o]
  }
}

// utility
var isArr = Array.isArray;
function hasVal (e) {
  return e || e === 0
}

/**
 * Convert anything to array. Speifically, split string separated by spaces,
 * commas or bars. If you give it an actual array, it returns it without
 * modification.
 *
 * This function __always__ returns an array (null or undefined values are converted
 * to empty arrays)
 *
 * Thanks to this function, the rest of the functions of this module accepts
 * strings as an array parameter.
 *
 * @function
 * @param {*} source - the thing to get an array from
 * @return {Array} the object as an array
 *
 * @example
 * import { asArr } from 'tonal-arrays'
 * asArr('C D E F G') // => ['C', 'D', 'E', 'F', 'G']
 * asArr('A, B, c') // => ['A', 'B', 'c']
 * asArr('1 | 2 | x') // => ['1', '2', 'x']
 */
var asArr = split(/\s*\|\s*|\s*,\s*|\s+/);

/**
 * Return a new array with the elements mapped by a function.
 * Basically the same as the JavaScript standard `array.map` but with
 * two enhacements:
 *
 * - Arrays can be expressed as strings (see [asArr])
 * - This function can be partially applied. This is useful to create _mapped_
 * versions of single element functions. For an excellent introduction of
 * the adventages [read this](https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch4.html)
 *
 * @param {Function} fn - the function
 * @param {Array|String} arr - the array to be mapped
 * @return {Array}
 * @example
 * var arr = require('tonal-arr')
 * var toUp = arr.map(function(e) { return e.toUpperCase() })
 * toUp('a b c') // => ['A', 'B', 'C']
 *
 * @example
 * var tonal = require('tonal')
 * tonal.map(tonal.transpose('M3'), 'C D E') // => ['E', 'F#', 'G#']
 */
function map (fn, list) {
  return arguments.length > 1
    ? map(fn)(list)
    : function (l) {
      return asArr(l).map(fn)
    }
}

/**
 * Return a copy of the array with the null values removed
 * @param {String|Array} list
 * @return {Array}
 * @example
 * tonal.compact(['a', 'b', null, 'c']) // => ['a', 'b', 'c']
 */
function compact (arr) {
  return asArr(arr).filter(hasVal)
}

/**
 * Filter an array with a function. Again, almost the same as JavaScript standard
 * filter function but:
 *
 * - It accepts strings as arrays
 * - Can be partially applied
 *
 * @param {Function} fn
 * @param {String|Array} arr
 * @return {Array}
 * @example
 * t.filter(t.noteName, 'a b c x bb') // => [ 'a', 'b', 'c', 'bb' ]
 */
function filter (fn, list) {
  return arguments.length > 1
    ? filter(fn)(list)
    : function (l) {
      return asArr(l).filter(fn)
    }
}

// a custom height function that
// - returns -Infinity for non-pitch objects
// - assumes pitch classes has octave -100 (so are sorted before that notes)
function objHeight (p) {
  if (!p) return -Infinity
  var f = tonalPitch.fifths(p) * 7;
  var o = tonalPitch.focts(p) || -Math.floor(f / 12) - 100;
  return f + o * 12
}

// ascending comparator
function ascComp (a, b) {
  return objHeight(a) - objHeight(b)
}
// descending comparator
function descComp (a, b) {
  return -ascComp(a, b)
}

/**
 * Sort a list of notes or intervals in ascending or descending pitch order.
 * It removes from the list any thing is not a pitch (a note or interval)
 *
 * Note this function returns a __copy__ of the array, it does NOT modify
 * the original.
 *
 * @param {Array|String} list - the list of notes or intervals
 * @param {Boolean|Function} comp - (Optional) comparator.
 * Ascending pitch by default. Pass a `false` to order descending
 * or a custom comparator function (that receives pitches in array notation).
 * Note that any other value is ignored.
 * @example
 * array.sort('D E C') // => ['C', 'D', 'E']
 * array.sort('D E C', false) // => ['E', 'D', 'C']
 * // if is not a note, it wil be removed
 * array.sort('g h f i c') // => ['C', 'F', 'G']
 */
function sort (list, comp) {
  var fn = arguments.length === 1 || comp === true
    ? ascComp
    : comp === false ? descComp : typeof comp === 'function' ? comp : ascComp;
  // if the list is an array, make a copy
  list = Array.isArray(list) ? list.slice() : asArr(list);
  return listFn(function (arr) {
    return arr.sort(fn).filter(hasVal)
  }, list)
}

/**
 * Randomizes the order of the specified array using the Fisher–Yates shuffle.
 *
 * @function
 * @param {Array|String} arr - the array
 * @return {Array} the shuffled array
 *
 * @example
 * import { shuffle } from 'tonal-arrays'
 * @example
 * var tonal = require('tonal')
 * tonal.shuffle('C D E F')
 */
var shuffle = listFn(function (arr) {
  var i, t;
  var m = arr.length;
  while (m) {
    i = (Math.random() * m--) | 0;
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr
});

function trOct (n) {
  return tonalTranspose.transpose(tonalPitch.pitch(0, n, 1))
}

/**
 * Rotates a list a number of times. It's completly agnostic about the
 * contents of the list.
 * @param {Integer} times - the number of rotations
 * @param {Array|String} list - the list to be rotated
 * @return {Array} the rotated array
 */
function rotate (times, list) {
  var arr = asArr(list);
  var len = arr.length;
  var n = (times % len + len) % len;
  return arr.slice(n, len).concat(arr.slice(0, n))
}

/**
 * Rotates an ascending list of pitches n times keeping the ascending property.
 * This functions assumes the list is an ascending list of pitches, and
 * transposes the them to ensure they are ascending after rotation.
 * It can be used, for example, to invert chords.
 *
 * @param {Integer} times - the number of rotations
 * @param {Array|String} list - the list to be rotated
 * @return {Array} the rotated array
 */
function rotateAsc (times, list) {
  return listFn(function (arr) {
    var len = arr.length;
    var n = (times % len + len) % len;
    var head = arr.slice(n, len);
    var tail = arr.slice(0, n);
    // See if the first note of tail is lower than the last of head
    var s = tonalDistance.semitones(head[len - n - 1], tail[0]);
    if (s < 0) {
      var octs = Math.floor(s / 12);
      if (times < 0) head = head.map(trOct(octs));
      else tail = tail.map(trOct(-octs));
    }
    return head.concat(tail)
  }, list)
}

/**
 * Select elements from a list.
 *
 * @param {String|Array} numbers - a __1-based__ index of the elements
 * @param {String|Array} list - the list of pitches
 * @return {Array} the selected elements (with nulls if not valid index)
 *
 * @example
 * import { select } from 'tonal-array'
 * select('1 3 5', 'C D E F G A B') // => ['C', 'E', 'G']
 * select('-1 0 1 2 3', 'C D') // => [ null, null, 'C', 'D', null ]
 */
function select (nums, list) {
  if (arguments.length === 1) {
    return function (l) {
      return select(nums, l)
    }
  }
  var arr = asArr(list);
  return asArr(nums).map(function (n) {
    return arr[n - 1] || null
  })
}

// http://stackoverflow.com/questions/9960908/permutations-in-javascript
/**
 * Get all permutations of a list
 * @param {Array|Strng} list - the list
 * @return {Array<Array>} an array with all the permutations
 */
function permutations (list) {
  list = asArr(list);
  if (list.length === 0) return [[]]
  return permutations(list.slice(1)).reduce(function (acc, perm) {
    return acc.concat(
      list.map(function (e, pos) {
        var newPerm = perm.slice();
        newPerm.splice(pos, 0, list[0]);
        return newPerm
      })
    )
  }, [])
}

// #### Transform lists in array notation
function asPitchStr (p) {
  return tonalPitch.strPitch(p) || p
}
function listToStr (v) {
  return tonalPitch.isPitch(v) ? tonalPitch.strPitch(v) : isArr(v) ? v.map(asPitchStr) : v
}

/**
 * Decorates a function to so it's first parameter is an array of pitches in
 * array notation. Also, if the return value is a pitch or an array of pitches
 * in array notation, it convert backs to strings.
 *
 * @private
 * @param {Function} fn - the function to decorate
 * @return {Function} the decorated function
 * @example
 * import { listFn } from 'tonal-arrays'
 * var octUp = listFn((p) => { p[2] = p[2] + 1; return p[2] })
 * octUp('C2 D2 E2') // => ['C3', 'D3', 'E3']
 */
function listFn (fn, list) {
  if (arguments.length === 1) {
    return function (l) {
      return listFn(fn, l)
    }
  }
  var arr = asArr(list).map(tonalPitch.asPitch);
  var res = fn(arr);
  return listToStr(res)
}

exports.asArr = asArr;
exports.map = map;
exports.compact = compact;
exports.filter = filter;
exports.sort = sort;
exports.shuffle = shuffle;
exports.rotate = rotate;
exports.rotateAsc = rotateAsc;
exports.select = select;
exports.permutations = permutations;

},{"tonal-distance":7,"tonal-pitch":16,"tonal-transpose":18}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tonalDictionary = require('tonal-dictionary');
var tonalArray = require('tonal-array');
var tonalNote = require('tonal-note');
var noteParser = require('note-parser');
var tonalHarmonizer = require('tonal-harmonizer');

var M = ["1P 3M 5P",["Major",""]];
var M13 = ["1P 3M 5P 7M 9M 13M",["maj13","Maj13"]];
var M6 = ["1P 3M 5P 13M",["6"]];
var M69 = ["1P 3M 5P 6M 9M",["69"]];
var M7add13 = ["1P 3M 5P 6M 7M 9M"];
var M7b5 = ["1P 3M 5d 7M"];
var M7b6 = ["1P 3M 6m 7M"];
var M7b9 = ["1P 3M 5P 7M 9m"];
var M7sus4 = ["1P 4P 5P 7M"];
var M9 = ["1P 3M 5P 7M 9M",["maj9","Maj9"]];
var M9b5 = ["1P 3M 5d 7M 9M"];
var M9sus4 = ["1P 4P 5P 7M 9M"];
var Madd9 = ["1P 3M 5P 9M",["2","add9","add2"]];
var Maj7 = ["1P 3M 5P 7M",["maj7","M7"]];
var Mb5 = ["1P 3M 5d"];
var Mb6 = ["1P 3M 13m"];
var Msus2 = ["1P 2M 5P",["add9no3","sus2"]];
var Msus4 = ["1P 4P 5P",["sus","sus4"]];
var addb9 = ["1P 3M 5P 9m"];
var m = ["1P 3m 5P",["minor"]];
var m11 = ["1P 3m 5P 7m 9M 11P",["_11"]];
var m11b5 = ["1P 3m 7m 12d 2M 4P",["h11","_11b5"]];
var m13 = ["1P 3m 5P 7m 9M 11P 13M",["_13"]];
var m6 = ["1P 3m 4P 5P 13M",["_6"]];
var m69 = ["1P 3m 5P 6M 9M",["_69"]];
var m7 = ["1P 3m 5P 7m",["minor7","_","_7"]];
var m7add11 = ["1P 3m 5P 7m 11P",["m7add4"]];
var m7b5 = ["1P 3m 5d 7m",["half-diminished","h7","_7b5"]];
var m9 = ["1P 3m 5P 7m 9M",["_9"]];
var m9b5 = ["1P 3m 7m 12d 2M",["h9","-9b5"]];
var mMaj7 = ["1P 3m 5P 7M",["mM7","_M7"]];
var mMaj7b6 = ["1P 3m 5P 6m 7M",["mM7b6"]];
var mM9 = ["1P 3m 5P 7M 9M",["mMaj9","-M9"]];
var mM9b6 = ["1P 3m 5P 6m 7M 9M",["mMaj9b6"]];
var mb6M7 = ["1P 3m 6m 7M"];
var mb6b9 = ["1P 3m 6m 9m"];
var o = ["1P 3m 5d",["mb5","dim"]];
var o7 = ["1P 3m 5d 13M",["diminished","m6b5","dim7"]];
var o7M7 = ["1P 3m 5d 6M 7M"];
var oM7 = ["1P 3m 5d 7M"];
var sus24 = ["1P 2M 4P 5P",["sus4add9"]];
var madd4 = ["1P 3m 4P 5P"];
var madd9 = ["1P 3m 5P 9M"];
var DATA = {
	M: M,
	M13: M13,
	M6: M6,
	M69: M69,
	M7add13: M7add13,
	M7b5: M7b5,
	M7b6: M7b6,
	M7b9: M7b9,
	M7sus4: M7sus4,
	M9: M9,
	M9b5: M9b5,
	M9sus4: M9sus4,
	Madd9: Madd9,
	Maj7: Maj7,
	Mb5: Mb5,
	Mb6: Mb6,
	Msus2: Msus2,
	Msus4: Msus4,
	addb9: addb9,
	m: m,
	m11: m11,
	m11b5: m11b5,
	m13: m13,
	m6: m6,
	m69: m69,
	m7: m7,
	m7add11: m7add11,
	m7b5: m7b5,
	m9: m9,
	m9b5: m9b5,
	mMaj7: mMaj7,
	mMaj7b6: mMaj7b6,
	mM9: mM9,
	mM9b6: mM9b6,
	mb6M7: mb6M7,
	mb6b9: mb6b9,
	o: o,
	o7: o7,
	o7M7: o7M7,
	oM7: oM7,
	sus24: sus24,
	madd4: madd4,
	madd9: madd9,
	"4": ["1P 4P 7m 10m",["quartal"]],
	"5": ["1P 5P"],
	"7": ["1P 3M 5P 7m",["Dominant","Dom"]],
	"9": ["1P 3M 5P 7m 9M",["79"]],
	"11": ["1P 5P 7m 9M 11P"],
	"13": ["1P 3M 5P 7m 9M 13M",["13_"]],
	"64": ["5P 8P 10M"],
	"M#5": ["1P 3M 5A",["augmented","maj#5","Maj#5","+","aug"]],
	"M#5add9": ["1P 3M 5A 9M",["+add9"]],
	"M13#11": ["1P 3M 5P 7M 9M 11A 13M",["maj13#11","Maj13#11","M13+4","M13#4"]],
	"M6#11": ["1P 3M 5P 6M 11A",["M6b5","6#11","6b5"]],
	"M69#11": ["1P 3M 5P 6M 9M 11A"],
	"M7#11": ["1P 3M 5P 7M 11A",["maj7#11","Maj7#11","M7+4","M7#4"]],
	"M7#5": ["1P 3M 5A 7M",["maj7#5","Maj7#5","maj9#5","M7+"]],
	"M7#5sus4": ["1P 4P 5A 7M"],
	"M7#9#11": ["1P 3M 5P 7M 9A 11A"],
	"M9#11": ["1P 3M 5P 7M 9M 11A",["maj9#11","Maj9#11","M9+4","M9#4"]],
	"M9#5": ["1P 3M 5A 7M 9M",["Maj9#5"]],
	"M9#5sus4": ["1P 4P 5A 7M 9M"],
	"11b9": ["1P 5P 7m 9m 11P"],
	"13#11": ["1P 3M 5P 7m 9M 11A 13M",["13+4","13#4"]],
	"13#9": ["1P 3M 5P 7m 9A 13M",["13#9_"]],
	"13#9#11": ["1P 3M 5P 7m 9A 11A 13M"],
	"13b5": ["1P 3M 5d 6M 7m 9M"],
	"13b9": ["1P 3M 5P 7m 9m 13M"],
	"13b9#11": ["1P 3M 5P 7m 9m 11A 13M"],
	"13no5": ["1P 3M 7m 9M 13M"],
	"13sus4": ["1P 4P 5P 7m 9M 13M",["13sus"]],
	"69#11": ["1P 3M 5P 6M 9M 11A"],
	"7#11": ["1P 3M 5P 7m 11A",["7+4","7#4","7#11_","7#4_"]],
	"7#11b13": ["1P 3M 5P 7m 11A 13m",["7b5b13"]],
	"7#5": ["1P 3M 5A 7m",["+7","7aug","aug7"]],
	"7#5#9": ["1P 3M 5A 7m 9A",["7alt","7#5#9_","7#9b13_"]],
	"7#5b9": ["1P 3M 5A 7m 9m"],
	"7#5b9#11": ["1P 3M 5A 7m 9m 11A"],
	"7#5sus4": ["1P 4P 5A 7m"],
	"7#9": ["1P 3M 5P 7m 9A",["7#9_"]],
	"7#9#11": ["1P 3M 5P 7m 9A 11A",["7b5#9"]],
	"7#9#11b13": ["1P 3M 5P 7m 9A 11A 13m"],
	"7#9b13": ["1P 3M 5P 7m 9A 13m"],
	"7add6": ["1P 3M 5P 7m 13M",["67","7add13"]],
	"7b13": ["1P 3M 7m 13m"],
	"7b5": ["1P 3M 5d 7m"],
	"7b6": ["1P 3M 5P 6m 7m"],
	"7b9": ["1P 3M 5P 7m 9m"],
	"7b9#11": ["1P 3M 5P 7m 9m 11A",["7b5b9"]],
	"7b9#9": ["1P 3M 5P 7m 9m 9A"],
	"7b9b13": ["1P 3M 5P 7m 9m 13m"],
	"7b9b13#11": ["1P 3M 5P 7m 9m 11A 13m",["7b9#11b13","7b5b9b13"]],
	"7no5": ["1P 3M 7m"],
	"7sus4": ["1P 4P 5P 7m",["7sus"]],
	"7sus4b9": ["1P 4P 5P 7m 9m",["susb9","7susb9","7b9sus","7b9sus4","phryg"]],
	"7sus4b9b13": ["1P 4P 5P 7m 9m 13m",["7b9b13sus4"]],
	"9#11": ["1P 3M 5P 7m 9M 11A",["9+4","9#4","9#11_","9#4_"]],
	"9#11b13": ["1P 3M 5P 7m 9M 11A 13m",["9b5b13"]],
	"9#5": ["1P 3M 5A 7m 9M",["9+"]],
	"9#5#11": ["1P 3M 5A 7m 9M 11A"],
	"9b13": ["1P 3M 7m 9M 13m"],
	"9b5": ["1P 3M 5d 7m 9M"],
	"9no5": ["1P 3M 7m 9M"],
	"9sus4": ["1P 4P 5P 7m 9M",["9sus"]],
	"m#5": ["1P 3m 5A",["m+","mb6"]],
	"m11A 5": ["1P 3m 6m 7m 9M 11P"],
	"m7#5": ["1P 3m 6m 7m"],
	"m9#5": ["1P 3m 6m 7m 9M"],
	"+add#9": ["1P 3M 5A 9A"]
};

/**
 * A chord is a harmonic unit with at least three different tones sounding simultaneously.
 *
 * This module have functions to create and manipulate chords. It includes a
 * chord dictionary and a simple chord detection algorithm.
 *
 * @example
 * var chord = require('tonal-chord')
 * chord.detect('c b g e') // => 'CMaj7'
 * chord.get('CMaj7') // => ['C', 'E', 'G', 'B']
 *
 * @module chord
 */
var dict = tonalDictionary.dictionary(DATA, function (str) { return str.split(' ') });

/**
 * Return the available chord names
 *
 * @function
 * @param {boolean} aliases - true to include aliases
 * @return {Array} the chord names
 *
 * @example
 * var chord = require('tonal-chord')
 * chord.names() // => ['maj7', ...]
 */
var names = dict.keys;

/**
 * Get chord notes or intervals from chord type
 *
 * This function is currified
 *
 * @param {String} type - the chord type
 * @param {Strng|Pitch} tonic - the tonic or false to get the intervals
 * @return {Array<String>} the chord notes or intervals, or null if not valid type
 *
 * @example
 * chords.get('dom7', 'C') // => ['C', 'E', 'G', 'Bb']
 * maj7 = chords.get('Maj7')
 * maj7('C') // => ['C', 'E', 'G', 'B']
 */
function get (type, tonic) {
  if (arguments.length === 1) return function (t) { return get(type, t) }
  var ivls = dict.get(type);
  return ivls ? tonalHarmonizer.harmonize(ivls, tonic) : null
}

/**
 * Get the chord notes of a chord. This function accepts either a chord name
 * (for example: 'Cmaj7') or a list of notes.
 *
 * It always returns an array, even if the chord is not found.
 *
 * @param {String|Array} chord - the chord to get the notes from
 * @return {Array<String>} a list of notes or empty list if not chord found
 *
 * @example
 * chord.notes('Cmaj7') // => ['C', 'E', 'G', 'B']
 */
function notes (chord) {
  var p = parse(chord);
  var ivls = dict.get(p.type);
  return ivls ? tonalHarmonizer.harmonize(ivls, p.tonic) : tonalArray.compact(tonalArray.map(tonalNote.name, chord))
}

/**
 * Get chord intervals. It always returns an array
 *
 * @param {String} name - the chord name (optionally a tonic and type)
 * @return {Array<String>} a list of intervals or null if the type is not known
 */
function intervals (name$$1) {
  var p = parse(name$$1);
  return dict.get(p.type) || []
}

/**
 * Check if a given name correspond to a chord in the dictionary
 * @param {String} name
 * @return {Boolean}
 * @example
 * chord.isKnownChord('CMaj7') // => true
 * chord.isKnownChord('Maj7') // => true
 * chord.isKnownChord('Ablah') // => false
 */
function isKnownChord (name$$1) {
  return intervals(name$$1).length > 0
}

/**
 * Detect a chord. Given a list of notes, return the chord name(s) if any.
 * It only detects chords with exactly same notes.
 *
 * @function
 * @param {Array|String} notes - the list of notes
 * @return {Array<String>} an array with the possible chords
 * @example
 * chord.detect('b g f# d') // => [ 'GMaj7' ]
 * chord.detect('e c a g') // => [ 'CM6', 'Am7' ]
 */
var detect = tonalDictionary.detector(dict, '');

/**
 * Get the position (inversion number) of a chord (0 is root position, 1 is first
 * inversion...). It assumes the chord is formed by superposed thirds.
 *
 * @param {Array|String} chord - the chord notes
 * @return {Integer} the inversion number (0 for root inversion, 1 for first
 * inversion...) or null if not a valid chord
 *
 * @example
 * chord.position('e g c') // => 1
 * chord.position('g3 e2 c5') // => 1 (e is the lowest note)
 */
function position (chord) {
  var pcs = tonalArray.map(tonalNote.pc, chord);
  var sorted = sortTriads(pcs);
  return sorted ? sorted.indexOf(pcs[0]) : null
}

/**
 * Given a chord in any inverstion, set to the given inversion. It accepts
 * chord names
 *
 * @param {Integer} num - the inversion number (0 root position, 1 first
 * inversion, ...)
 * @param {String|Array} chord - the chord name or notes
 * @return {Array} the chord pitch classes in the desired inversion or
 * an empty array if no inversion found (not triadic)
 *
 * @example
 * chord.inversion(1, 'Cmaj7') // => [ 'E', 'G', 'B', 'C' ]
 * chord.inversion(0, 'e g c') // => [ 'C', 'E', 'G' ]
 */
function inversion (num, chord) {
  if (arguments.length === 1) return function (c) { return inversion(num, c) }
  var sorted = sortTriads(chord);
  return sorted ? tonalArray.rotate(num, sorted) : []
}

function sortTriads (chord) {
  var all = tonalArray.permutations(notes(chord).map(tonalNote.pc));
  for (var i = 0; i < all.length; i++) {
    var ivls = tonalHarmonizer.intervallic(all[i]);
    if (areTriads(ivls)) return all[i]
  }
  return null
}

function areTriads (list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i][0] !== '3') return false
  }
  return true
}

/**
 * Try to parse a chord name. It returns an array with the chord type and
 * the tonic. If not tonic is found, all the name is considered the chord
 * name.
 *
 * This function does NOT check if the chord type exists or not. It only tries
 * to split the tonic and chord type.
 *
 * @param {String} name - the chord name
 * @return {Array} an array with [type, tonic]
 * @example
 * chord.parse('Cmaj7') // => { tonic: 'C', type: 'maj7' }
 * chord.parse('C7') // => { tonic: 'C', type: '7' }
 * chord.parse('mMaj7') // => { tonic: false, type: 'mMaj7' }
 * chord.parse('Cnonsense') // => { tonic: 'C', type: 'nonsense' }
 */
function parse (name$$1) {
  var p = noteParser.regex().exec(name$$1);
  if (!p) return { type: name$$1, tonic: false }

  // If chord name is empty, the octave is the chord name
  return !p[4] ? { type: p[3], tonic: p[1] + p[2] }
    // If the octave is 6 or 7 is asumed to be part of the chord name
    : (p[3] === '7' || p[3] === '6') ? { type: p[3] + p[4], tonic: p[1] + p[2] }
    : { type: p[4], tonic: p[1] + p[2] + p[3] }
}

exports.names = names;
exports.get = get;
exports.notes = notes;
exports.intervals = intervals;
exports.isKnownChord = isKnownChord;
exports.detect = detect;
exports.position = position;
exports.inversion = inversion;
exports.parse = parse;

},{"note-parser":3,"tonal-array":4,"tonal-dictionary":6,"tonal-harmonizer":11,"tonal-note":14}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tonalArray = require('tonal-array');
var tonalNote = require('tonal-note');
var tonalPcset = require('tonal-pcset');

/**
 * This module contains functions to query tonal dictionaries.
 *
 * A tonal dictionary is basically a map from keys to list of intervals. It
 * also supports name aliases. See `tonal-chords` or `tonal-scales` to examples
 * of dictionaries.
 *
 * This functions are quite low level, and probably you wont need it, because
 * they are friendly served via `tonal-chords` and `tonal-scales`.
 *
 * __Those functions are NOT visible via `tonal` package__.
 *
 * @module dictionary
 */
function id (x) { return x }

/**
 * Create a tonal dictionary. A dictionary is an object with two functions: get and
 * keys.
 *
 * The data given to this constructor it's a HashMap in the form:
 * `{ key: [intervals, [aliases]] }`
 *
 * @param {HashMap} data - the dictionary data
 * @return {Object} the dictionary object
 *
 * @example
 * var dictionary = require('tonal-dictionary').dictionary
 * var DATA = {
 * 'maj7': ['1 3 5 7', ['Maj7']],
 *   'm7': ['1 b3 5 7']
 * }
 * var chords = dictionary(DATA, function (str) { return str.split(' ') })
 * chords.get('maj7') // => [ '1', '3', '5', '7' ]
 * chords.get('Maj7') // => [ '1', '3', '5', '7' ]
 * chords.get('m7') // => ['1', 'b3', '5', '7']
 * chords.get('m7b5') // => null
 * chords.keys() // => ['maj7', 'm7']
 * chords.keys(true) // => ['maj7', 'm7', 'Maj7']
 */
function dictionary (raw, parse) {
  parse = parse || id;
  var byKey = {};
  var names = Object.keys(raw);
  var aliases = [];
  names.forEach(function (k) {
    var value = parse(raw[k][0]);
    byKey[k] = value;
    if (raw[k][1]) {
      raw[k][1].forEach(function (alias) {
        byKey[alias] = value;
        aliases.push(alias);
      });
    }
  });
  return {
    /**
     * Get a value by key
     * @name get
     * @function
     * @param {String} key
     * @return {Object} the value (normally an array of intervals or notes)
     * @memberof dictionary
     */
    get: function (n) { return byKey[n] },
    /**
     * Get the valid keys of dictionary
     * @name keys
     * @function
     * @param {Boolean} aliases - (Optional) include aliases names (false by default)
     * @param {Function} filter - a function to filter the names. It receives the
     * name and the value as parameters
     * @return {Array<String>} the keys
     * @memberof dictionary
     */
    keys: function (all, filter) {
      var keys = all ? names.concat(aliases) : names.slice();
      return typeof filter !== 'function' ? keys
        : keys.filter(function (k) { return filter(k, byKey[k]) })
    }
  }
}

/**
 * Create a pitch set detector. Given a dictionary data, it returns a
 * function that tries to detect a given pitch set inside the dictionary
 *
 * @param {Dictionary} dictionary - the dictionary object
 * @param {Function|String} builder - (Optional) a function that given a name and a tonic,
 * returns the object or a string to join both
 * @return {Function} the detector function
 * @see chord.detect
 * @see scale.detect
 * @example
 * var detect = detector(dictionary(DATA), '')
 * detect('c d e b') // => 'Cmaj/'
 */
function detector (dict, build) {
  var isSep = typeof build === 'string';
  var isFn = typeof build === 'function';
  var nameByChroma = dict.keys(false).reduce(function (map$$1, key) {
    map$$1[tonalPcset.chroma(dict.get(key))] = key;
    return map$$1
  }, {});

  return function (notes) {
    notes = tonalArray.sort(tonalArray.map(tonalNote.pc, notes));
    var sets = tonalPcset.chromaModes(notes);
    return tonalArray.compact(sets.map(function (set, i) {
      var type = nameByChroma[set];
      if (!type) return null
      var tonic = notes[i];
      return isSep ? tonic + build + type
        : isFn ? build(type, tonic)
        : [type, tonic]
    }))
  }
}

exports.dictionary = dictionary;
exports.detector = detector;

},{"tonal-array":4,"tonal-note":14,"tonal-pcset":15}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tonalPitch = require('tonal-pitch');

/**
 * Functions to calculate distances between notes
 *
 * @example
 * // using node's require
 * var distance = require('tonal-distance')
 * distance.interval('C4', 'G4') // => '5P'
 *
 * @example
 * // using ES6 import
 * import { interval, semitones } from 'tonal-distance'
 * semitones('C' ,'D') // => 2
 *
 * @module distance
 */
// substract two pitches
function substr (a, b) {
  if (!a || !b || a[1].length !== b[1].length) return null
  var f = tonalPitch.fifths(b) - tonalPitch.fifths(a);
  if (tonalPitch.isPC(a)) return tonalPitch.pitch(f, -Math.floor(f * 7 / 12), 1)
  var o = tonalPitch.focts(b) - tonalPitch.focts(a);
  var d = tonalPitch.height(b) - tonalPitch.height(a) < 0 ? -1 : 1;
  return tonalPitch.pitch(d * f, d * o, d)
}

/**
 * Find the interval between two pitches. Both pitches MUST be of the same type:
 *
 * - notes: it returns the interval between the first and the second
 * - pitch classes: it returns the __ascending__ interval between both
 * - intervals: substract one from the other
 *
 * @param {Pitch|String} from - distance from
 * @param {Pitch|String} to - distance to
 * @return {Interval} the distance between pitches
 *
 * @example
 * var distance = require('tonal-distance')
 * distance.interval('C2', 'C3') // => 'P8'
 * distance.interval('G', 'B') // => 'M3'
 * // or use tonal
 * var tonal = require('tonal')
 * tonal.distance.interval('M2', 'P5') // => 'P4'
 */
function interval (a, b) {
  if (arguments.length === 1) return function (b) { return interval(a, b) }
  var pa = tonalPitch.asPitch(a);
  var pb = tonalPitch.asPitch(b);
  var i = substr(pa, pb);
  // if a and b are in array notation, no conversion back
  return a === pa && b === pb ? i : tonalPitch.strIvl(i)
}

/**
 * Get the distance between two notes in semitones
 * @param {String|Pitch} from - first note
 * @param {String|Pitch} to - last note
 * @return {Integer} the distance in semitones or null if not valid notes
 * @example
 * import { semitones } from 'tonal-distance'
 * semitones('C3', 'A2') // => -3
 * // or use tonal
 * tonal.distance.semitones('C3', 'G3') // => 7
 */
function semitones (a, b) {
  var i = substr(tonalPitch.asPitch(a), tonalPitch.asPitch(b));
  return i ? tonalPitch.height(i) : null
}

exports.interval = interval;
exports.semitones = semitones;

},{"tonal-pitch":16}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Functions to encoding and decoding pitches into fifths/octaves notation.
 *
 * This functions are very low level and it's probably you wont need them.
 * @private
 * @module encoding
 */

function isNum (n) { return typeof n === 'number' }

// Map from letter step to number of fifths starting from 'C':
// { C: 0, D: 2, E: 4, F: -1, G: 1, A: 3, B: 5 }
var FIFTHS = [0, 2, 4, -1, 1, 3, 5];
// Given a number of fifths, return the octaves they span
function fOcts (f) { return Math.floor(f * 7 / 12) }
// Get the number of octaves it span each step
var FIFTH_OCTS = FIFTHS.map(fOcts);

/**
 * Given a note's step, alteration and octave returns the fiths/octave
 * note encoding.
 * @param {number} step - the step number (0 = C, 1 = D, ...)
 * @param {number} alteration - the note alteration (..., -1 = 'b', 0 = '', 1 = '#', ...)
 * @param {number} octave - the note octave
 * @return {Array} the [fifths, octave] representation of that note
 */
function encode (step, alt, oct) {
  var f = FIFTHS[step] + 7 * alt;
  if (!isNum(oct)) return [f]
  var o = oct - FIFTH_OCTS[step] - 4 * alt;
  return [f, o]
}

// Return the number of fifths as if it were unaltered
function unaltered (f) {
  var i = (f + 1) % 7;
  return i < 0 ? 7 + i : i
}

// We need to get the steps from fifths
// Fifths for CDEFGAB are [ 0, 2, 4, -1, 1, 3, 5 ]
// We add 1 to fifths to avoid negative numbers, so:
// for ['F', 'C', 'G', 'D', 'A', 'E', 'B'] we have:
var STEPS = [3, 0, 4, 1, 5, 2, 6];

/**
 * Decode a encoded pitch
 * @param {Number} fifths - the number of fifths
 * @param {Number} octs - the number of octaves to compensate the fifhts
 * @return {Array} in the form [step, alt, oct]
 */
function decode (f, o) {
  var step = STEPS[unaltered(f)];
  var alt = Math.floor((f + 1) / 7);
  if (!isNum(o)) return [step, alt]
  var oct = o + 4 * alt + FIFTH_OCTS[step];
  return [step, alt, oct]
}

exports.encode = encode;
exports.decode = decode;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tonalMidi = require('tonal-midi');

/**
 * [![npm version](https://img.shields.io/npm/v/tonal-freq.svg)](https://www.npmjs.com/package/tonal-freq)
 * [![tonal](https://img.shields.io/badge/tonal-freq-yellow.svg)](https://www.npmjs.com/browse/keyword/tonal)
 *
 * `tonal-freq` is a collection of functions to perform calculations related to frequencies.
 *
 * This is part of [tonal](https://www.npmjs.com/package/tonal) music theory library.
 *
 * ## Usage
 *
 * ```js
 * var freq = require('tonal-freq')
 * freq.toFreq('A4') // => 440
 * freq.note(440) // => 'A4'
 * freq.noteAndDetune(320) // => ['C4', 200]
 * ```
 *
 * ## Install
 *
 * [![npm install tonal-freq](https://nodei.co/npm/tonal-freq.png?mini=true)](https://npmjs.org/package/tonal-freq/)
 *
 * ## API Documentation
 *
 * @module freq
 */
// decorate a function to round the numeric result to a max
function round (m, fn) {
  m = m || m === 0 ? Math.pow(10, m) : false;
  return function (v) {
    v = fn(v);
    return v === null ? null : m ? Math.round(v * m) / m : v
  }
}

/**
 * Return the equal tempered frequency of a note.
 *
 * This function can be partially applied if note parameter is not present.
 * @function
 * @param {Float} ref - the tuning reference
 * @param {Integer} maxDecimals - (Optional) the maximum number of decimals (all by default)
 * @param {String|Pitch} note - the note to get the frequency from
 * @return {Number} the frequency
 * @example
 * eqTempFreq(444, 4, 'C3')
 * const toFreq = eqTempFreq(444, 2)
 * toFreq('A3') // => 222
 */
function eqTempFreq (ref, max, note$$1) {
  if (arguments.length > 2) return eqTempFreq(ref, max)(note$$1)
  return round(max, function (p) {
    var m = tonalMidi.toMidi(p);
    return m ? Math.pow(2, (m - 69) / 12) * ref : null
  })
}

/**
 * Get the frequency of note with 2 decimals precission using A4 440Hz tuning
 *
 * This is an alias for: `eqTempFreq(440, 2, <note>)`
 *
 * @function
 * @param {Number|String} note - the note name or midi number
 * @return {Float} the frequency in herzs
 * @example
 * freq.toFreq('A4') // => 440
 * freq.toFreq('C4') // => 261.63
 */
var toFreq = eqTempFreq(440, 2);

/**
 * Get the midi note from a frequency in equal temperament scale. You can
 * specify the number of decimals of the midi number.
 *
 * @param {Float} tuning - (Optional) the reference A4 tuning (440Hz by default)
 * @param {Number} freq - the frequency
 * @return {Number} the midi number
 */
function eqTempFreqToMidi (ref, max, freq) {
  if (arguments.length > 2) return eqTempFreqToMidi(ref, max)(freq)
  return round(max, function (freq) {
    return 12 * (Math.log(freq) - Math.log(ref)) / Math.log(2) + 69
  })
}

/**
 * Get midi number from frequency with two decimals of precission.
 *
 * This is an alisas for: `eqTempFreqToMidi(440, 2, <freq>)`
 *
 * @function
 * @param {Float} freq
 * @return {Number} midi number
 * @example
 * freq.toMidi(361) // => 59.96
 */
var toMidi$1 = eqTempFreqToMidi(440, 2);

/**
 * Get note name from frequency using an equal temperament scale with 440Hz
 * as reference
 *
 * @param {Float} freq
 * @param {Boolean} useSharps - (Optional) set to true to use sharps instead of flats
 * @return {String} note name
 * @example
 * freq.note(440) // => 'A4'
 */
function note$1 (freq, useSharps) {
  return tonalMidi.note(toMidi$1(freq), useSharps)
}

/**
 * Get difference in cents between two frequencies. The frequencies can be
 * expressed with hertzs or midi numbers or note names
 * @param {Float|Integer|String} base
 * @param {Float|Integer|String} freq
 * @return {Integer} The difference in cents
 * @example
 * import { cents } from 'tonal-freq'
 * cents('C4', 261) // => -4
 */
function cents (base, freq) {
  var b = toFreq(base) || base;
  var f = toFreq(freq) || freq;
  return Math.round(1200 * (Math.log(f / b) / Math.log(2)))
}

exports.eqTempFreq = eqTempFreq;
exports.toFreq = toFreq;
exports.eqTempFreqToMidi = eqTempFreqToMidi;
exports.toMidi = toMidi$1;
exports.note = note$1;
exports.cents = cents;

},{"tonal-midi":13}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tonalDictionary = require('tonal-dictionary');
var tonalInterval = require('tonal-interval');
var tonalTranspose = require('tonal-transpose');
var tonalNote = require('tonal-note');
var tonalArray = require('tonal-array');
var tonalRange = require('tonal-range');
var tonalPcset = require('tonal-pcset');

var guitar = ["E2 A2 D3 G3 B3 E4",["guitar 6-string standard"]];
var charango = ["G4 G4 C5 C5 E5 E4 A4 A4 E5 E5"];
var bouzouki = ["C3 C4 F3 F4 A3 A3 D4 D4"];
var DATA = {
	guitar: guitar,
	charango: charango,
	bouzouki: bouzouki,
	"open D tuning": ["D2 A2 D3 F#3 A3 D4",["vestopol"]],
	"open C tuning": ["C2 G2 C3 G3 C4 E4"]
};

/**
 * This module has functions to create fretboards and query for instrument
 * tunnings.
 *
 * __Currently is NOT part of the tonal distribution__
 *
 * @module fretboard
 */
var dict = tonalDictionary.dictionary(DATA, function (s) { return s.split(' ') });

/**
 * Given a tuning name, returns the notes of the strings in the open position
 * @function
 * @param {String} name - the tuning name
 * @return {Array} the string notes or null if not valid tuning name
 * @example
 * var fret = require('tonal-fretboard')
 * fret.tuning('guitar') // => [ 'E2', 'A2', 'D3', 'G3', 'B3', 'E4' ]
 * fret.tuning('charango') // => [ 'G4', 'G4', 'C5', 'C5', 'E5', 'E4', 'A4', 'A4', 'E5', 'E5' ]
 */
var tuning = dict.get;

/**
 * Given a tuning name returns the notes of the strings in open position
 * as pitch classes removing doubled strings.
 * @param {String} name - the tuning name or notes of the strings in open position
 * @return {Array} the string notes as pitch classes
 * @example
 * fret.simpleTuning('guitar') => [ 'E', 'A', 'D', 'G', 'B', 'E' ]
 * fret.simpleTuning('charango') => [ 'G', 'C', 'E', 'A', 'E' ]
 */
function simpleTuning (src) {
  var pcs = tonalArray.map(tonalNote.pc, tuning(src) || src);
  var simple = pcs.reduce(function (s, pc$$1, i) {
    if (s === false) return s
    else if (i % 2 === 0) s.push(pc$$1);
    else if (s[s.length - 1] !== pc$$1) return false
    return s
  }, []);
  return simple || pcs
}

/**
 * Get all available tuning names
 * @function
 * @param {Boolean} aliases - get aliases or not
 * @return {Array} an array of tuning names
 */
var names = dict.keys;

/**
 * Build a fretboard using a given tuning (or tuning name), first and last
 * fret numbers and optionally a chord or scale
 *
 * It returns an array of arrays, where each sub-array is the notes of
 * a string.
 *
 * @param {String|Array} tuning - the tuning name or notes
 * @param {Integer} first - the first fret number
 * @param {Integer} last - the last fret number
 * @param {Array|String} set - a scale or chord to filter the fretboard
 * @return {Array} An array of arrays, one for each string
 */
function notes (tun, first, last, set) {
  first = first || 0;
  last = last || first;
  var ivls = tonalRange.numeric([first, last]).map(tonalInterval.fromSemitones);
  var notes = tuning(tun) || tonalArray.asArr(tun);
  var filterFn = set ? tonalArray.map(includedIn(set)) : id;
  return notes.map(function (b) {
    return ivls.map(tonalTranspose.transpose(b))
  }).map(filterFn)
}
function id (o) { return o }
function includedIn (set) {
  var isInSet = tonalPcset.includes(set);
  return function (n) { return isInSet(n) ? n : null }
}

/**
 * Build a fretboard only showing the notes for the given scale.
 * @param {String|Array} tuning - the tuning name or notes
 * @param {String|Array} scale - the scale notes
 * @param {Integer} first - the first fret number
 * @param {Integer} last - the last fret number
 * @return {Array} An array of arrays, one for each string
 */
function scale (tuning, scale, first, last) {
  return notes(tuning, first, last, scale)
}

/**
 * Build an array of reachable chord shapes based on given notes and tuning.
 * @param {String|Array} tuning - the tuning name or notes
 * @param {Array} notes - an array of chord notes
 * @param {Integer} first - the first fret number
 * @param {Integer} last - the last fret number
 * @param {Integer} span - how many frets to include per position
 * @return {Array} An array of arrays, one for each possible shape.  Element index is string number [ '0', '2', '2', '1', '0', '0' ]
 */
function chordShapes (tuning, notes, first, last, span) {
  var fretboard = scale(tuning, notes, first, last);
  var positions = [];

  // Break each string array into {fretSpan} frets overlapping sections
  var strings = fretboard.map(function (string, stringIndex) {
    return string.map(function (fret, fretIndex) {
      return tonalArray.compact(string.slice(fretIndex, fretIndex + span).map(function (slicedFret, slicedFretIndex) {
        // Convert note names to fret numbers
        return slicedFret !== null ? fretIndex + slicedFretIndex : null
      }))
    })
  });

  // Build positions
  strings.forEach(function (string) {
    string.forEach(function (fretGroup, fretGroupIndex) {
      if (!Array.isArray(positions[fretGroupIndex])) positions[fretGroupIndex] = [];

      if (fretGroup.length > 1) positions[fretGroupIndex].push(fretGroup);
      else positions[fretGroupIndex].push(fretGroup.toString() ? fretGroup.toString() : null);
    });
  });

  // Remove null and neighboring duplicate arrays
  return positions.filter(function (position, i) {
    if (!tonalArray.compact(position).length) return false
    return i === 0 ? position : positions[i].toString() !== positions[i - 1].toString()
  })
}

exports.tuning = tuning;
exports.simpleTuning = simpleTuning;
exports.names = names;
exports.notes = notes;
exports.scale = scale;
exports.chordShapes = chordShapes;

},{"tonal-array":4,"tonal-dictionary":6,"tonal-interval":12,"tonal-note":14,"tonal-pcset":15,"tonal-range":17,"tonal-transpose":18}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tonalTranspose = require('tonal-transpose');
var tonalDistance = require('tonal-distance');
var tonalArray = require('tonal-array');

/**
 * Functions to transpose o calculate distances from a collection of notes.
 *
 * A useful concept is _harmonizer_: a function that _harmonizes_ notes. It can
 * be created by partially applying the `harmonize` function (see examples)
 *
 * @example
 * var harmonizer = require('tonal-harmonizer')
 * harmonizer.harmonize('1P 3M 5P', 'C') // => ['C', 'E', 'G']
 * var maj7 = harmonizer.harmonize('1P 3M 5P 7M')
 * maj7('D4') // =>  ['D4', 'F#4', 'A4', 'C#5']
 * harmonizer.harmonics('C E G') // => ['1P', '3M', '5P']
 *
 * @example
 * // in tonal this functions are NOT namespaced
 * var tonal = require('tonal')
 * tonal.harmonize('1P 3M 5P', 'G')
 *
 * @example
 * // using ES6 import syntax
 * import { harmonize } from 'tonal-harmonizer'
 * harmonize(...)
 *
 * @module harmonizer
 */
/**
 * Given a list of notes, return the distance from the first note to the rest.
 * @param {Array|String} notes - the list of notes
 * @return {Array} the intervals relative to the first note
 * @example
 * harmonizer.harmonics('C E G') // => ['1P', '3M', '5P']
 *
 * @example
 * // in tonal this functions are NOT namespaced
 * tonal.harmonics(tonal.scale('C major')) // => ['1P', ...]
 */
function harmonics (list) {
  var a = tonalArray.asArr(list);
  return a.length ? tonalArray.compact(a.map(tonalDistance.interval(a[0]))) : a
}

/**
 * Given a list of notes, return the intervallic structure: the distance from
 * one to the next.
 *
 * Notice that the number of intervals is one less that the number of notes.
 *
 * @param {Array|String} notes - the list of notes
 * @return {Array} the intervals relative to the previous
 * @example
 * harmonizer.intervallic('c e g') // => ['3M', '3m']
 * harmonizer.intervallic('e g c') // => ['3m', '4P']
 * harmonizer.intervallic('c') // => []
 */
function intervallic (notes) {
  var dist = [];
  notes = tonalArray.asArr(notes);
  for (var i = 1; i < notes.length; i++) {
    dist.push(tonalDistance.interval(notes[i - 1], notes[i]));
  }
  return dist
}

/**
 * Given a list of intervals and a tonic, return that tonic transposed
 * to that intervals.
 *
 * It's currified and, calling with only one parameter, returns an harmonizer,
 * a function that harmonizes any note (see example)
 *
 * @function
 * @param {String|Array} list - the list of intervals
 * @param {String|Pitch} note - the note to be harmonized
 * @return {Array} the resulting notes
 * @example
 * harmonizer.harmonize('P1 M3 P5 M7', 'C') // => ['C', 'E', 'G', 'B']
 * @example
 * // harmonizer with partial application
 * var maj7 = harmonize.harmonizer('P1 M3 P5 M7')
 * maj7('C') // => ['C', 'E', 'G', 'B']
 * @example
 * // in tonal this function is NOT namespaced
 * var C = tonal.harmonizer('C D E')
 * C('M3') // => ['E', 'G#', 'B']
 */
function harmonize (list, pitch) {
  if (arguments.length > 1) return harmonize(list)(pitch)
  return function (tonic) {
    return tonalArray.compact(tonalArray.map(tonalTranspose.transpose(tonic || 'P1'), list))
  }
}

exports.harmonics = harmonics;
exports.intervallic = intervallic;
exports.harmonize = harmonize;

},{"tonal-array":4,"tonal-distance":7,"tonal-transpose":18}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var intervalNotation = require('interval-notation');
var tonalPitch = require('tonal-pitch');

/**
 * [![npm version](https://img.shields.io/npm/v/tonal-interval.svg)](https://www.npmjs.com/package/tonal-interval)
 * [![tonal](https://img.shields.io/badge/tonal-interval-yellow.svg)](https://www.npmjs.com/browse/keyword/tonal)
 *
 * `tonal-interval` is a collection of functions to create and manipulate music intervals.
 *
 * The intervals are strings in shorthand notation. Two variations are supported:
 *
 * - standard shorthand notation: type and number, for example: 'M3', 'd-4'
 * - inverse shorthand notation: number and then type, for example: '3M', '-4d'
 *
 * The problem with the standard shorthand notation is that some strings can be
 * parsed as notes or intervals, for example: 'A4' can be note A in 4th octave
 * or an augmented four. To remove ambiguity, the prefered notation in tonal is the
 * inverse shortand notation.
 *
 * This is part of [tonal](https://www.npmjs.com/package/tonal) music theory library.
 *
 * ## Usage
 *
 * ```js
 * import * as interval from 'tonal-interval'
 * // or var interval = require('tonal-interval')
 * interval.semitones('4P') // => 5
 * interval.invert('3m') // => '6M'
 * interval.simplify('9m') // => '2m'
 * ```
 *
 * ## Install
 *
 * [![npm install tonal-interval](https://nodei.co/npm/tonal-interval.png?mini=true)](https://npmjs.org/package/tonal-interval/)
 *
 * ## API Documentation
 *
 * @module interval
 */
/**
 * Get interval name. Can be used to test if it's an interval. It accepts intervals
 * as pitch or string in shorthand notation or tonal notation. It returns always
 * intervals in tonal notation.
 *
 * @param {String|Pitch} interval - the interval string or array
 * @return {String} the interval name or null if not valid interval
 * @example
 * interval.toInterval('m-3') // => '-3m'
 * interval.toInterval('3') // => null
 */
function toInterval (ivl) {
  var i = tonalPitch.asIvlPitch(ivl);
  return i ? tonalPitch.strIvl(i) : null
}

/**
 * Get the number of the interval (same as value, but always positive)
 *
 * @param {String|Pitch} interval - the interval
 * @return {Integer} the positive interval number (P1 is 1, m2 is 2, ...)
 * @example
 * interval.num('m2') // => 2
 * interval.num('P9') // => 9
 * interval.num('P-4') // => 4
 */
function num (ivl) {
  var p = props(ivl);
  return p ? p.num : null
}

/**
 * Get the interval value (the interval number, but positive or negative
 * depending the interval direction)
 *
 * @param {String|Pitch} interval - the interval
 * @return {Integer} the positive interval number (P1 is 1, m-2 is -2, ...)
 * @example
 * interval.num('m2') // => 2
 * interval.num('m9') // => 9
 * interval.num('P-4') // => -4
 * interval.num('m-9') // => -9
 */
function value (ivl) {
  var p = props(ivl);
  return p ? p.num * p.dir : null
}

/**
 * Get interval properties. It returns an object with:
 *
 * - num: the interval number (always positive)
 * - alt: the interval alteration (0 for perfect in perfectables, or 0 for major in _majorables_)
 * - dir: the interval direction (1 ascending, -1 descending)
 *
 * @param {String|Pitch} interval - the interval
 * @return {Array} the interval in the form [number, alt]
 * @example
 * interval.parse('m2') // => { num: 2, alt: -1, dir: 1 }
 * interval.parse('m9') // => { num: 9, alt: -1, dir: 1 }
 * interval.parse('P-4') // => { num: 4, alt: 0, dir: -1}
 * interval.parse('m-9') // => { num: 9, alt: -1, dir: -1 }
 */
function props (ivl) {
  var i = tonalPitch.asIvlPitch(ivl);
  if (!i) return null
  var d = tonalPitch.decode(i);
  return { num: d[0] + 1 + d[2] * 7, alt: d[1], dir: i[2] }
}

/**
 * Given a interval property object, get the interval name
 *
 * @param {Object} props - the interval property object
 *
 * - num: the interval number
 * - alt: the interval alteration
 * - dir: the direction
 * @return {String} the interval name
 */
function fromProps (props) {
  if (!props || props.num < 1) return null
  var octs = Math.floor((props.num) / 8);
  var simple = props.num - 7 * octs;
  return intervalNotation.build(simple, props.alt || 0, octs, props.dir)
}

/**
 * Get size in semitones of an interval
 * @param {String|Pitch} ivl
 * @return {Integer} the number of semitones or null if not an interval
 * @example
 * import { semitones } from 'tonal-interval'
 * semitones('P4') // => 5
 * // or using tonal
 * tonal.semitones('P5') // => 7
 */
function semitones (ivl) {
  var i = tonalPitch.asIvlPitch(ivl);
  return i ? tonalPitch.height(i) : null
}

// interval numbers
var IN = [1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7];
// interval qualities
var IQ = 'P m M m M P d P m M m M'.split(' ');

/**
 * Get interval name from semitones number. Since there are several interval
 * names for the same number, the name it's arbitraty, but deterministic.
 * @param {Integer} num - the number of semitones (can be negative)
 * @return {String} the interval name
 * @example
 * import { fromSemitones } from 'tonal-interval'
 * fromSemitones(7) // => '5P'
 * // or using tonal
 * tonal.fromSemitones(-7) // => '-5P'
 */
function fromSemitones (num) {
  var d = num < 0 ? -1 : 1;
  var n = Math.abs(num);
  var c = n % 12;
  var o = Math.floor(n / 12);
  return d * (IN[c] + 7 * o) + IQ[c]
}

var CLASSES = [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
/**
 * Get the [interval class](https://en.wikipedia.org/wiki/Interval_class)
 * number of a given interval.
 *
 * In musical set theory, an interval class is the shortest distance in
 * pitch class space between two unordered pitch classes
 *
 * As paramter you can pass an interval in shorthand notation, an interval in
 * array notation or the number of semitones of the interval
 *
 * @param {String|Integer} interval - the interval or the number of semitones
 * @return {Integer} A value between 0 and 6
 *
 * @example
 * interval.ic('P8') // => 0
 * interval.ic('m6') // => 4
 * ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'].map(ic) // => [0, 2, 4, 5, 5, 3, 1]
 */
function ic (ivl) {
  var i = tonalPitch.asIvlPitch(ivl);
  var s = i ? tonalPitch.chr(i) : Math.round(ivl);
  return isNaN(s) ? null : CLASSES[Math.abs(s) % 12]
}

var TYPES = 'PMMPPMM';
/**
 * Get interval type. Can be perfectable (1, 4, 5) or majorable (2, 3, 6, 7)
 * It does NOT return the actual quality.
 *
 * @param {String|Pitch} interval
 * @return {String} 'P' for perfectables, 'M' for majorables or null if not
 * valid interval
 * @example
 * interval.type('5A') // => 'P'
 */
function type (ivl) {
  var i = tonalPitch.asIvlPitch(ivl);
  return i ? TYPES[tonalPitch.decode(i)[0]] : null
}

/**
 * Get the inversion (https://en.wikipedia.org/wiki/Inversion_(music)#Intervals)
 * of an interval.
 *
 * @function
 * @param {String|Pitch} interval - the interval to invert in interval shorthand
 * notation or interval array notation
 * @return {String|Pitch} the inverted interval
 *
 * @example
 * interval.invert('3m') // => '6M'
 * interval.invert('2M') // => '7m'
 */
var invert = tonalPitch.ivlFn(function (i) {
  var d = tonalPitch.decode(i);
  // d = [step, alt, oct]
  var step = (7 - d[0]) % 7;
  var alt = TYPES[d[0]] === 'P' ? -d[1] : -(d[1] + 1);
  return tonalPitch.encode(step, alt, d[2], tonalPitch.dir(i))
});

/**
 * Get the simplified version of an interval.
 *
 * @function
 * @param {String|Array} interval - the interval to simplify
 * @return {String|Array} the simplified interval
 *
 * @example
 * interval.simplify('9M') // => '2M'
 * ['8P', '9M', '10M', '11P', '12P', '13M', '14M', '15P'].map(interval.simplify)
 * // => [ '8P', '2M', '3M', '4P', '5P', '6M', '7M', '8P' ]
 * interval.simplify('2M') // => '2M'
 * interval.simplify('-2M') // => '7m'
 */
var simplify = tonalPitch.ivlFn(function (i) {
  // decode to [step, alt, octave]
  var dec = tonalPitch.decode(i);
  // if it's not 8 reduce the octaves to 0
  if (dec[0] !== 0 || dec[2] !== 1) dec[2] = 0;
  // encode back
  return tonalPitch.encode(dec[0], dec[1], dec[2], tonalPitch.dir(i))
});

exports.toInterval = toInterval;
exports.num = num;
exports.value = value;
exports.props = props;
exports.fromProps = fromProps;
exports.semitones = semitones;
exports.fromSemitones = fromSemitones;
exports.ic = ic;
exports.type = type;
exports.invert = invert;
exports.simplify = simplify;

},{"interval-notation":2,"tonal-pitch":16}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var noteParser = require('note-parser');

/**
 * A midi note number is a number representation of a note pitch. It can be
 * integers so it's equal tempered tuned, or float to indicate it's not
 * tuned into equal temepered scale.
 *
 * This module contains functions to convert to and from midi notes.
 *
 * @example
 * var midi = require('tonal-midi')
 * midi.toMidi('A4') // => 69
 * midi.note(69) // => 'A4'
 * midi.note(61) // => 'Db4'
 * midi.note(61, true) // => 'C#4'
 *
 * @module midi
 */

/**
 * Convert the given note to a midi note number. If you pass a midi number it
 * will returned as is.
 *
 * @param {Array|String|Number} note - the note to get the midi number from
 * @return {Integer} the midi number or null if not valid pitch
 * @example
 * midi.toMidi('C4') // => 60
 * midi.toMidi(60) // => 60
 * midi.toMidi('60') // => 60
 */
function toMidi (val) {
  if (Array.isArray(val) && val.length === 2) return val[0] * 7 + val[1] * 12 + 12
  return noteParser.midi(val)
}

var FLATS = 'C Db D Eb E F Gb G Ab A Bb B'.split(' ');
var SHARPS = 'C C# D D# E F F# G G# A A# B'.split(' ');

/**
 * Given a midi number, returns a note name. The altered notes will have
 * flats unless explicitly set with the optional `useSharps` parameter.
 *
 * @function
 * @param {Integer} midi - the midi note number
 * @param {Boolean} useSharps - (Optional) set to true to use sharps instead of flats
 * @return {String} the note name
 * @example
 * var midi = require('tonal-midi')
 * midi.note(61) // => 'Db4'
 * midi.note(61, true) // => 'C#4'
 * // it rounds to nearest note
 * midi.note(61.7) // => 'D4'
 */
function note (num, sharps) {
  if (num === true || num === false) return function (m) { return note(m, num) }
  num = Math.round(num);
  var pcs = sharps === true ? SHARPS : FLATS;
  var pc = pcs[num % 12];
  var o = Math.floor(num / 12) - 1;
  return pc + o
}

exports.toMidi = toMidi;
exports.note = note;

},{"note-parser":3}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var noteParser = require('note-parser');
var tonalPitch = require('tonal-pitch');
var tonalTranspose = require('tonal-transpose');
var tonalMidi = require('tonal-midi');
var tonalFreq = require('tonal-freq');

/**
 * [![npm version](https://img.shields.io/npm/v/tonal-note.svg)](https://www.npmjs.com/package/tonal-note)
 * [![tonal](https://img.shields.io/badge/tonal-note-yellow.svg)](https://www.npmjs.com/browse/keyword/tonal)
 *
 * `tonal-note` is a collection of functions to manipulate musical notes in scientific notation
 *
 * This is part of [tonal](https://www.npmjs.com/package/tonal) music theory library.
 *
 * ## Usage
 *
 * ```js
 * import * as note from 'tonal-note'
 * // or var note = require('tonal-note')
 * note.name('bb2') // => 'Bb2'
 * note.chroma('bb2') // => 10
 * note.enharmonics('C#6') // => [ 'B##5', 'C#6', 'Db6' ]
 * note.simplify('B#3') // => 'C4'
 *
 * // using ES6 import syntax
 * import { name } from 'tonal-note'
 * ['c', 'db3', '2', 'g+', 'gx4'].map(name)
 * // => ['C', 'Db3', null, null, 'G##4']
 * ```
 *
 * ## Install
 *
 * [![npm install tonal-note](https://nodei.co/npm/tonal-note.png?mini=true)](https://npmjs.org/package/tonal-note/)
 *
 * ## API Documentation
 *
 * @module note
 */
var cache = {};
function parseNote (name) {
  if (typeof name !== 'string') return null
  return cache[name] || (cache[name] = noteParser.parse(name))
}

/**
 * Get the note midi number
 * (an alias of tonal-midi `toMidi` function)
 *
 * @function
 * @param {Array|String|Number} note - the note to get the midi number from
 * @return {Integer} the midi number or null if not valid pitch
 * @example
 * note.midi('C4') // => 60
 * @see midi.toMidi
 */
var midi = tonalMidi.toMidi;

/**
 * Get the note name of a given midi note number
 * (an alias of tonal-midi `note` function)
 *
 * @function
 * @param {Integer} midi - the midi note number
 * @param {Boolean} useSharps - (Optional) set to true to use sharps instead of flats
 * @return {String} the note name
 * @example
 * note.fromMidi(60) // => 'C4'
 * @see midi.note
 */
var fromMidi = tonalMidi.note;

/**
 * Get the frequency of a note
 * (an alias of the tonal-note package `toFreq` function)
 *
 * @function
 * @param {Array|String|Number} note - the note to get the frequency
 * @return {Number} the frequency
 * @example
 * note.freq('A4') // => 440
 * @see freq.toFreq
 */
var freq = tonalFreq.toFreq;

/**
 * Return the chroma of a note. The chroma is the numeric equivalent to the
 * pitch class, where 0 is C, 1 is C# or Db, 2 is D... 11 is B
 *
 * @param {String|Pitch} note
 * @return {Integer} the chroma
 * @example
 * var note = require('tonal-note')
 * note.chroma('Cb') // => 11
 * ['C', 'D', 'E', 'F'].map(note.chroma) // => [0, 2, 4, 5]
 */
function chroma (n) {
  var p = parseNote(n);
  return p ? p.chroma : null
}

/**
 * Given a note (as string or as array notation) returns a string
 * with the note name in scientific notation or null
 * if not valid note
 *
 * Can be used to test if a string is a valid note name.
 *
 * @function
 * @param {Pitch|String}
 * @return {String}
 *
 * @example
 * var note = require('tonal-note')
 * note.name('cb2') // => 'Cb2'
 * ['c', 'db3', '2', 'g+', 'gx4'].map(note.name) // => ['C', 'Db3', null, null, 'G##4']
 */
function name (n) {
  var p = tonalPitch.asNotePitch(n);
  return p ? tonalPitch.strNote(p) : null
}

/**
 * @deprecated
 * An alias for note. Get the name of a note in scientific notation
 * @function
 */
function note$1 (n) {
  console.warn('note.note() is deprecated. Use note.name()');
  return name(n)
}

/**
 * @deprecated
 * Get note properties. It returns an object with the following properties:
 *
 * - step: 0 for C, 6 for B. Do not confuse with chroma
 * - alt: 0 for not accidentals, positive sharps, negative flats
 * - oct: the octave number or undefined if a pitch class
 *
 * @param {String|Pitch} note - the note
 * @return {Object} the object with note properties or null if not valid note
 * @example
 * note.props('Db3') // => { step: 1, alt: -1, oct: 3 }
 * note.props('C#') // => { step: 0, alt: 1, oct: undefined }
 */
function props (n) {
  console.warn('note.props() is deprecated. Use: note.step(), note.alt() or note.oct()');
  var p = tonalPitch.asNotePitch(n);
  if (!p) return null
  var d = tonalPitch.decode(p);
  return { step: d[0], alt: d[1], oct: d[2] }
}

/**
 * @deprecated
 * Given a note properties object, return the string representation if
 * scientific notation
 *
 * @param {Object} noteProps - an object with the following attributes:
 * @return {String} the note name
 *
 * - step: a number from 0 to 6 meaning note step letter from 'C' to 'B'
 * - alt: the accidentals as number (0 no accidentals, 1 is '#', 2 is '##', -2 is 'bb')
 * - oct: (Optional) the octave. If not present (or undefined) it returns a pitch class
 *
 * @example
 * note.fromProps({ step: 1, alt: -1, oct: 5 }) // => 'Db5'
 * note.fromProps({ step: 0, alt: 1 }) // => 'C#'
 */
function fromProps (props) {
  console.warn('note.fromProps() is deprecated. See npm package note-parser.');
  return props ? noteParser.build(props.step, props.alt, props.oct) : null
}

function getProp (name) {
  return function (n) { var p = props(n); return p ? p[name] : null }
}

/**
 * Get the octave of the given pitch
 *
 * @function
 * @param {String|Pitch} note - the note
 * @return {Integer} the octave, undefined if its a pitch class or null if
 * not a valid note
 * @example
 * note.oct('C#4') // => 4
 * note.oct('C') // => undefined
 * note.oct('blah') // => undefined
 */
var oct = getProp('oct');

/**
 * Get the note step: a number equivalent of the note letter. 0 means C and
 * 6 means B. This is different from `chroma` (see example)
 *
 * @function
 * @param {String|Pitch} note - the note
 * @return {Integer} a number between 0 and 6 or null if not a note
 * @example
 * note.step('C') // => 0
 * note.step('Cb') // => 0
 * // usually what you need is chroma
 * note.chroma('Cb') // => 6
 */
var step = getProp('step');

/**
 * @deprecated
 * Get the note step in fifths from 'C'. One property of the perfect fifth
 * interval is that you can obtain any pitch class by transposing 'C' a
 * number of times. This function return that number.
 * @param {String|Pitch} note - the note (can be a pitch class)
 * @return {Integer} the number of fifths to reach that pitch class from 'C'
 */
function pcFifths (note$$1) {
  console.warn('note.pcFifths() is deprecated. Use distance.inFifths()');
  var p = tonalPitch.asNotePitch(note$$1);
  return p ? tonalPitch.fifths(p) : null
}

/**
 * Get the note alteration: a number equivalent to the accidentals. 0 means
 * no accidentals, negative numbers are for flats, positive for sharps
 *
 * @function
 * @param {String|Pitch} note - the note
 * @return {Integer} the alteration
 * @example
 * note.alt('C') // => 0
 * note.alt('C#') // => 1
 * note.alt('Cb') // => -1
 */
var alt = getProp('alt');

/**
 * Get pitch class of a note. The note can be a string or a pitch array.
 *
 * @function
 * @param {String|Pitch}
 * @return {String} the pitch class
 * @example
 * tonal.pc('Db3') // => 'Db'
 * tonal.map(tonal.pc, 'db3 bb6 fx2') // => [ 'Db', 'Bb', 'F##']
 */
function pc (n) {
  var p = tonalPitch.asNotePitch(n);
  return p ? tonalPitch.strNote([ p[0], [ tonalPitch.fifths(p) ] ]) : null
}

var ASC = tonalPitch.parseIvl('2d');
var DESC = tonalPitch.parseIvl('-2d');

/**
 * Get the enharmonics of a note. It returns an array of three elements: the
 * below enharmonic, the note, and the upper enharmonic
 *
 * @param {String} note - the note to get the enharmonics from
 * @return {Array} an array of pitches ordered by distance to the given one
 *
 * @example
 * var note = require('tonal-note')
 * note.enharmonics('C') // => ['B#', 'C', 'Dbb']
 * note.enharmonics('A') // => ['G##', 'A', 'Bbb']
 * note.enharmonics('C#4') // => ['B##3', 'C#4' 'Db4']
 * note.enharmonics('Db') // => ['C#', 'Db', 'Ebbb'])
 */
function enharmonics (pitch) {
  var notes = [];
  notes.push(tonalTranspose.transpose(DESC, pitch));
  if (notes[0] === null) return null
  notes.push(pitch);
  notes.push(tonalTranspose.transpose(ASC, pitch));
  return notes
}

/**
 * Get a simpler enharmonic note name from a note if exists
 *
 * @param {String} note - the note to simplify
 * @return {String} the simplfiied note (if not found, return same note)
 *
 * @example
 * var note = require('tonal-note')
 * note.simplify('B#3') // => 'C4'
 */
function simplify (pitch) {
  return enharmonics(pitch).reduce(function (simple, next) {
    if (!simple) return next
    return simple.length > next.length ? next : simple
  }, null)
}

exports.midi = midi;
exports.fromMidi = fromMidi;
exports.freq = freq;
exports.chroma = chroma;
exports.name = name;
exports.note = note$1;
exports.props = props;
exports.fromProps = fromProps;
exports.oct = oct;
exports.step = step;
exports.pcFifths = pcFifths;
exports.alt = alt;
exports.pc = pc;
exports.enharmonics = enharmonics;
exports.simplify = simplify;

},{"note-parser":3,"tonal-freq":9,"tonal-midi":13,"tonal-pitch":16,"tonal-transpose":18}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tonalPitch = require('tonal-pitch');
var tonalNote = require('tonal-note');
var tonalArray = require('tonal-array');
var tonalTranspose = require('tonal-transpose');

/**
 * [![npm version](https://img.shields.io/npm/v/tonal-pcset.svg?style=flat-square)](https://www.npmjs.com/package/tonal-pcset)
 * [![tonal](https://img.shields.io/badge/tonal-pcset-yellow.svg?style=flat-square)](https://www.npmjs.com/browse/keyword/tonal)
 *
 * `tonal-pcset` is a collection of functions to work with pitch class sets, oriented
 * to make comparations (isEqual, isSubset, isSuperset)
 *
 * This is part of [tonal](https://www.npmjs.com/package/tonal) music theory library.
 *
 * You can install via npm: `npm i --save tonal-pcset`
 *
 * ```js
 * var pcset = require('tonal-pcset')
 * pcset.isEqual('c2 d5 e6', 'c6 e3 d1') // => true
 * ```
 *
 * ## API documentation
 *
 * @module pcset
 */
function chrToInt (set) { return parseInt(chroma(set), 2) }
function pitchChr (p) { p = tonalPitch.asPitch(p); return p ? tonalPitch.chr(p) : null }

/**
 * Get chroma of a pitch class set. A chroma identifies each set uniquely.
 * It's a 12-digit binary each presenting one semitone of the octave.
 *
 * Note that this function accepts a chroma as parameter and return it
 * without modification.
 *
 * @param {Array|String} set - the pitch class set
 * @return {String} a binary representation of the pitch class set
 * @example
 * pcset.chroma('C D E') // => '1010100000000'
 */
function chroma (set) {
  if (isChroma(set)) return set
  var b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  tonalArray.map(pitchChr, set).forEach(function (i) {
    b[i] = 1;
  });
  return b.join('')
}

/**
 * @deprecated
 * @see collection.pcset
 * Given a list of notes, return the pitch class names of the set
 * starting with the first note of the list
 * @param {String|Array} notes - the pitch class set notes
 * @return {Array} an array of pitch class sets
 */
function notes (notes) {
  // FIXME: move to collection
  console.warn('pcset.notes deprecated. Use collection.pcset');
  var pcs = tonalArray.map(tonalNote.pc, notes);
  if (!pcs.length) return pcs
  var tonic = pcs[0];
  // since the first note of the chroma is always C, we have to rotate it
  var rotated = tonalArray.rotate(pitchChr(tonic), chroma(pcs).split('')).join('');
  return fromChroma(rotated, tonic)
}

/**
 * Given a a list of notes or a pcset chroma, produce the rotations
 * of the chroma discarding the ones that starts with '0'
 *
 * This is used, for example, to get all the modes of a scale.
 *
 * @param {Array|String} set - the list of notes or pitchChr of the set
 * @param {Boolean} normalize - (Optional, true by default) remove all
 * the rotations that starts with '0'
 * @return {Array<String>} an array with all the modes of the chroma
 *
 * @example
 * pcset.modes('C E G')
 */
function modes (set, normalize) {
  normalize = normalize !== false;
  var binary = chroma(set).split('');
  return tonalArray.compact(binary.map(function (_, i) {
    var r = tonalArray.rotate(i, binary);
    return normalize && r[0] === '0' ? null : r.join('')
  }))
}
/**
 * @deprecated
 * @see modes
 */
function chromaModes (set, norm) {
  console.warn('pcset.chromaModes deprecated. Renamed to pcset.modes');
  return modes(set, norm)
}

var REGEX = /^[01]{12}$/;

/**
 * Test if the given string is a pitch class set chroma.
 * @param {String} chroma - the pitch class set chroma
 * @return {Boolean} true if its a valid pcset chroma
 * @example
 * pcset.isChroma('101010101010') // => true
 * pcset.isChroma('101001') // => false
 */
function isChroma (set) {
  return REGEX.test(set)
}

var IVLS = '1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M'.split(' ');
/**
 * Given a pcset (notes or chroma) return it's intervals
 * @param {String|Array} pcset - the pitch class set (notes or chroma)
 * @return {Array} intervals or empty array if not valid pcset
 * @example
 * pcset.intervals('1010100000000') => ['C', 'D', 'E']
 */
function intervals (set) {
  return tonalArray.compact(chroma(set).split('').map(function (d, i) {
    return d === '1' ? IVLS[i] : null
  }))
}

/**
 * @deprecated
 * @see intervals
 * Given a pitch class set in binary notation it returns the intervals or notes
 * (depending on the tonic)
 * @param {String} binary - the pitch class set in binary representation
 * @param {String|Pitch} tonic - the pitch class set tonic
 * @return {Array} a list of notes or intervals
 * @example
 * pcset.fromChroma('101010101010', 'C') // => ['C', 'D', 'E', 'Gb', 'Ab', 'Bb']
 */
function fromChroma (binary, tonic) {
  console.warn('pcset.fromChroma is deprecated. Use pcset.intervals().map(...)');
  if (arguments.length === 1) return function (t) { return fromChroma(binary, t) }
  if (!tonic) tonic = 'P1';
  return intervals(binary).map(tonalTranspose.transpose(tonic))
}

/**
 * Test if two pitch class sets are identical
 *
 * @param {Array|String} set1 - one of the pitch class sets
 * @param {Array|String} set2 - the other pitch class set
 * @return {Boolean} true if they are equal
 * @example
 * pcset.isEqual('c2 d3', 'c5 d2') // => true
 */
function isEqual (s1, s2) {
  if (arguments.length === 1) return function (s) { return isEqual(s1, s) }
  return chroma(s1) === chroma(s2)
}
function equal (a, b) {
  console.warn('pcset.equal is deprecated. Use pcset.isEqual');
  return isEqual(a, b)
}

/**
 * Test if a pitch class set is a subset of another
 *
 * @param {Array|String} set - the base set to test against
 * @param {Array|String} test - the set to test
 * @return {Boolean} true if the test set is a subset of the set
 * @example
 * pcset.subset('c d e', 'C2 D4 D5 C6') // => true
 */
function isSubset (set, test) {
  if (arguments.length === 1) return function (t) { return isSubset(set, t) }
  test = chrToInt(test);
  return (test & chrToInt(set)) === test
}
function subset (a, b) {
  console.warn('pcset.subset is deprecated. Use pcset.isSubset');
  return isSubset(a, b)
}

/**
 * Test if a pitch class set is a superset
 *
 * @param {Array|String} set - the base set to test against
 * @param {Array|String} test - the set to test
 * @return {Boolean} true if the test set is a superset of the set
 * @example
 * pcset.isSuperset('c d e', 'C2 D4 F4 D5 E5 C6') // => true
 */
function isSuperset (set, test) {
  if (arguments.length === 1) return function (t) { return isSuperset(set, t) }
  test = chrToInt(test);
  return (test | chrToInt(set)) === test
}
function superset (a, b) {
  console.warn('pcset.superset is deprecated. Use pcset.isSuperset');
  return isSuperset(a, b)
}

/**
 * Test if a given pitch class set includes a note
 * @param {Array|String} set - the base set to test against
 * @param {String|Pitch} note - the note to test
 * @return {Boolean} true if the note is included in the pcset
 * @example
 * pcset.includes('c d e', 'C4') // =A true
 * pcset.includes('c d e', 'C#4') // =A false
 */
function includes (set, note) {
  if (arguments.length > 1) return includes(set)(note)
  set = chroma(set);
  return function (note) { return set[pitchChr(note)] === '1' }
}

/**
 * Filter a list with a pitch class set
 *
 * @param {Array|String} set - the pitch class set notes
 * @param {Array|String} notes - the note list to be filtered
 * @return {Array} the filtered notes
 *
 * @example
 * pcset.filter('c d e', 'c2 c#2 d2 c3 c#3 d3') // => [ 'c2', 'd2', 'c3', 'd3' ])
 * pcset.filter('c2', 'c2 c#2 d2 c3 c#3 d3') // => [ 'c2', 'c3' ])
 */
function filter (set, notes) {
  if (arguments.length === 1) return function (n) { return filter(set, n) }
  return tonalArray.asArr(notes).filter(includes(set))
}

exports.chroma = chroma;
exports.notes = notes;
exports.modes = modes;
exports.chromaModes = chromaModes;
exports.isChroma = isChroma;
exports.intervals = intervals;
exports.fromChroma = fromChroma;
exports.isEqual = isEqual;
exports.equal = equal;
exports.isSubset = isSubset;
exports.subset = subset;
exports.isSuperset = isSuperset;
exports.superset = superset;
exports.includes = includes;
exports.filter = filter;

},{"tonal-array":4,"tonal-note":14,"tonal-pitch":16,"tonal-transpose":18}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var noteParser = require('note-parser');
var intervalNotation = require('interval-notation');
var tonalEncoding = require('tonal-encoding');

/**
 * Functions to deal with pitches (either notes or intervals).
 *
 * This functions are very low level and more developer friendly of this functions
 * are exposed in the note and interval packages. It's unlikely you need them.
 * That's why __this module is NOT exported in the tonal package__.
 *
 * @private
 * @module pitch
 */
/**
 * Create a pitch
 * @param {Integer} fifths - the number of fifths from C or from P1
 * @param {Integer} focts - the number of encoded octaves
 * @param {Integer} dir - (Optional) Only required for intervals. Can be 1 or -1
 * @return {Pitch}
 */
function pitch (fifths, focts, dir) {
  return dir ? ['tnlp', [fifths, focts], dir] : ['tnlp', [fifths, focts]]
}
/**
 * Test if an object is a pitch
 * @param {Pitch}
 * @return {Boolean}
 */
function isPitch (p) { return Array.isArray(p) && p[0] === 'tnlp' }
/**
 * Encode a pitch
 * @param {Integer} step
 * @param {Integer} alt
 * @param {Integer} oct
 * @param {Integer} dir - (Optional)
 */
function encode$1 (s, a, o, dir) {
  return dir ? ['tnlp', tonalEncoding.encode(s, a, o), dir] : ['tnlp', tonalEncoding.encode(s, a, o)]
}

/**
 * Decode a pitch
 * @param {Pitch} the pitch
 * @return {Array} An array with [step, alt, oct]
 */
function decode$1 (p) {
  return tonalEncoding.decode.apply(null, p[1])
}

/**
 * Get pitch type
 * @param {Pitch}
 * @return {String} 'ivl' or 'note' or null if not a pitch
 */
function pType (p) {
  return !isPitch(p) ? null : p[2] ? 'ivl' : 'note'
}
/**
 * Test if is a pitch note (with or without octave)
 * @param {Pitch}
 * @return {Boolean}
 */
function isNotePitch (p) { return pType(p) === 'note' }
/**
 * Test if is an interval
 * @param {Pitch}
 * @return {Boolean}
 */
function isIvlPitch (p) { return pType(p) === 'ivl' }
/**
 * Test if is a pitch class (a pitch note without octave)
 * @param {Pitch}
 * @return {Boolean}
 */
function isPC (p) { return isPitch(p) && p[1].length === 1 }

/**
 * Get direction of a pitch (even for notes)
 * @param {Pitch}
 * @return {Integer} 1 or -1
 */
function dir (p) { return p[2] === -1 ? -1 : 1 }

/**
 * Get encoded fifths from pitch.
 * @param {Pitch}
 * @return {Integer}
 */
function fifths (p) { return p[2] === -1 ? -p[1][0] : p[1][0] }
/**
 * Get encoded octaves from pitch.
 * @param {Pitch}
 * @return {Integer}
 */
function focts (p) { return p[2] === -1 ? -p[1][1] : p[1][1] }
/**
 * Get height of a pitch.
 * @param {Pitch}
 * @return {Integer}
 */
function height (p) { return fifths(p) * 7 + focts(p) * 12 }

/**
 * Get chroma of a pitch. The chroma is a number between 0 and 11 to represent
 * the position of a pitch inside an octave. Is the numeric equivlent of a
 * pitch class.
 *
 * @param {Pitch}
 * @return {Integer}
 */
function chr (p) {
  var f = fifths(p);
  return 7 * f - 12 * Math.floor(f * 7 / 12)
}

// memoize parsers
function memoize (fn) {
  var cache = {};
  return function (str) {
    if (typeof str !== 'string') return null
    return cache[str] || (cache[str] = fn(str))
  }
}

/**
 * Parse a note
 * @function
 * @param {String} str
 * @return {Pitch} the pitch or null if not valid note string
 */
var parseNote = memoize(function (s) {
  var p = noteParser.parse(s);
  return p ? encode$1(p.step, p.alt, p.oct) : null
});

/**
 * Parse an interval
 * @function
 * @param {String} str
 * @return {Pitch} the pitch or null if not valid interval string
 */
var parseIvl = memoize(function (s) {
  var p = intervalNotation.parse(s);
  if (!p) return null
  return p ? encode$1(p.simple - 1, p.alt, p.oct, p.dir) : null
});

/**
 * Parse a note or an interval
 * @param {String} str
 * @return {Pitch} the pitch or null if not valid pitch string
 */
function parsePitch (s) { return parseNote(s) || parseIvl(s) }

/**
 * Ensure the given object is a note pitch. If is a string, it will be
 * parsed. If not a note pitch or valid note string, it returns null.
 * @param {Pitch|String}
 * @return {Pitch}
 */
function asNotePitch (p) { return isNotePitch(p) ? p : parseNote(p) }
/**
 * Ensure the given object is a interval pitch. If is a string, it will be
 * parsed. If not a interval pitch or valid interval string, it returns null.
 * @param {Pitch|String}
 * @return {Pitch}
 */
function asIvlPitch (p) { return isIvlPitch(p) ? p : parseIvl(p) }
/**
 * Ensure the given object is a pitch. If is a string, it will be
 * parsed. If not a pitch or valid pitch string, it returns null.
 * @param {Pitch|String}
 * @return {Pitch}
 */
function asPitch (p) { return isPitch(p) ? p : parsePitch(p) }

/**
 * Convert a note pitch to string representation
 * @param {Pitch}
 * @return {String}
 */
function strNote (p) {
  if (!isNotePitch(p)) return null
  return noteParser.build.apply(null, decode$1(p))
}

/**
 * Convert a interval pitch to string representation
 * @param {Pitch}
 * @return {String}
 */
function strIvl (p) {
  if (!isIvlPitch(p)) return null
  // decode to [step, alt, oct]
  var d = decode$1(p);
  // d = [step, alt, oct]
  var num = d[0] + 1 + 7 * d[2];
  return p[2] * num + intervalNotation.altToQ(num, d[1])
}

/**
 * Convert a pitch to string representation (either notes or intervals)
 * @param {Pitch}
 * @return {String}
 */
function strPitch (p) { return strNote(p) || strIvl(p) }

// A function that creates a decorator
// The returned function can _decorate_ other functions to parse and build
// string representations
function decorator (is, parse$$1, str) {
  return function (fn) {
    return function (v) {
      var i = is(v);
      // if the value is in pitch notation no conversion
      if (i) return fn(v)
      // else parse the pitch
      var p = parse$$1(v);
      // if parsed, apply function and back to string
      return p ? str(fn(p)) : null
    }
  }
}

/**
 * Decorate a function to work internally with note pitches, even if the
 * parameters are provided as strings. Also it converts back the result
 * to string if a note pitch is returned.
 * @function
 * @param {Function} fn
 * @return {Function} the decorated function
 */
var noteFn = decorator(isNotePitch, parseNote, strNote);
/**
 * Decorate a function to work internally with interval pitches, even if the
 * parameters are provided as strings. Also it converts back the result
 * to string if a interval pitch is returned.
 * @function
 * @param {Function} fn
 * @return {Function} the decorated function
 */
var ivlFn = decorator(isIvlPitch, parseIvl, strIvl);
/**
 * Decorate a function to work internally with pitches, even if the
 * parameters are provided as strings. Also it converts back the result
 * to string if a pitch is returned.
 * @function
 * @param {Function} fn
 * @return {Function} the decorated function
 */
var pitchFn = decorator(isPitch, parsePitch, strPitch);

exports.pitch = pitch;
exports.isPitch = isPitch;
exports.encode = encode$1;
exports.decode = decode$1;
exports.pType = pType;
exports.isNotePitch = isNotePitch;
exports.isIvlPitch = isIvlPitch;
exports.isPC = isPC;
exports.dir = dir;
exports.fifths = fifths;
exports.focts = focts;
exports.height = height;
exports.chr = chr;
exports.parseNote = parseNote;
exports.parseIvl = parseIvl;
exports.parsePitch = parsePitch;
exports.asNotePitch = asNotePitch;
exports.asIvlPitch = asIvlPitch;
exports.asPitch = asPitch;
exports.strNote = strNote;
exports.strIvl = strIvl;
exports.strPitch = strPitch;
exports.noteFn = noteFn;
exports.ivlFn = ivlFn;
exports.pitchFn = pitchFn;

},{"interval-notation":2,"note-parser":3,"tonal-encoding":8}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tonalArray = require('tonal-array');
var tonalTranspose = require('tonal-transpose');
var tonalMidi = require('tonal-midi');
var tonalPcset = require('tonal-pcset');

/**
 * A collection of functions to create note ranges.
 *
 * @example
 * var range = require('tonal-range')
 * // ascending chromatic range
 * range.chromatic(['C4', 'E4']) // => ['C4', 'Db4', 'D4', 'Eb4', 'E4']
 * // descending chromatic range
 * range.chromatic(['E4', 'C4']) // => ['E4', 'Eb4', 'D4', 'Db4', 'C4']
 * // combining ascending and descending in complex ranges
 * range.chromatic(['C2', 'E2', 'D2']) // => ['C2', 'Db2', 'D2', 'Eb2', 'E2', 'Eb2', 'D2']
 * // numeric (midi note numbers) range
 * range.numeric('C4 E4 Bb3') // => [60, 61, 62, 63, 64]
 * // complex numeric range
 * range.numeric('C4 E4 Bb3') // => [60, 61, 62, 63, 64, 63, 62, 61, 60, 59, 58]
 * // create a scale range
 * range.pitchSet('c e g a', 'c2 c3 c2') // => [ 'C2', 'E2', 'G2', 'A2', 'C3', 'A2', 'G2', 'E2', 'C2' ] *
 g
 * @module range
 */
function isNum (n) { return typeof n === 'number' }
// convert notes to midi if needed
function asNum (n) { return isNum(n) ? n : tonalMidi.toMidi(n) }
// ascending range
function ascR (b, n) { for (var a = []; n--; a[n] = n + b); return a }
// descending range
function descR (b, n) { for (var a = []; n--; a[n] = b - n); return a }
// create a range between a and b
function ran (a, b) {
  return a === null || b === null ? []
    : a < b ? ascR(a, b - a + 1) : descR(a, a - b + 1)
}

/**
 * Create a numeric range. You supply a list of notes or numbers and it will
 * be conected to create complex ranges.
 *
 * @param {String|Array} list - the list of notes or numbers used
 * @return {Array} an array of numbers or empty array if not vald parameters
 *
 * @example
 * range.numeric(["C5", "C4']) // => [ 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60 ]
 * // it works midi notes
 * range.numeric([10, 5]) // => [ 10, 9, 8, 7, 6, 5 ]
 * // complex range
 * range.numeric('C4 E4 Bb3') // => [60, 61, 62, 63, 64, 63, 62, 61, 60, 59, 58]
 * // can be expressed with a string or array
 * range.numeric('C2 C4 C2') === range.numeric(['C2', 'C4', 'C2'])
 */
function numeric (list) {
  return tonalArray.asArr(list).map(asNum).reduce(function (r, n, i) {
    if (i === 1) return ran(r, n)
    var last = r[r.length - 1];
    return r.concat(ran(last, n).slice(1))
  })
}

/**
 * Create a range of chromatic notes. The altered notes will use flats.
 *
 * @function
 * @param {String|Array} list - the list of notes or midi note numbers
 * @return {Array} an array of note names
 * @example
 * tonal.chromatic('C2 E2 D2') // => ['C2', 'Db2', 'D2', 'Eb2', 'E2', 'Eb2', 'D2']
 * // with sharps
 * tonal.chromatic('C2 C3', true) // => [ 'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3' ]
 */
function chromatic (list, sharps) {
  return tonalArray.map(tonalMidi.note(sharps === true), numeric(list))
}

/**
 * Create a range with a cycle of fifths
 * @function
 * @param {String|Pitch} tonic - the tonic note or pitch class
 * @param {Array|String} range - the range array
 * @return {Array} a range of cycle of fifths starting with the tonic
 * @example
 * range.fifths('C', [0, 6]) // => [ 'C', 'G', 'D', 'A', 'E', 'B', 'F#' ])
 */
function fifths (tonic, range) {
  return numeric(range).map(tonalTranspose.trFifths(tonic))
}

/**
 * Create a pitch set (scale or chord) range. Given a pitch set (a collection
 * of pitch classes), and a range array, it returns a range in notes.
 *
 * @param {String|Array|Function} scale - the scale to use or a function to
 * convert from midi numbers to note names
 * @param {String|Array} range - a list of notes or midi numbers
 * @return {Array} the scale range, an empty array if not valid source or
 * null if not valid start or end
 * @example
 * range.pitchSet('C D E F G A B', ['C3', 'C2'])
 * // => [ 'C3', 'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2' ]
 */
function pitchSet (set, range) {
  if (arguments.length === 1) return function (l) { return pitchSet(set, l) }

  return tonalPcset.filter(set, chromatic(range))
}

exports.numeric = numeric;
exports.chromatic = chromatic;
exports.fifths = fifths;
exports.pitchSet = pitchSet;

},{"tonal-array":4,"tonal-midi":13,"tonal-pcset":15,"tonal-transpose":18}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tonalPitch = require('tonal-pitch');

/**
 * This module deals with note transposition. Just two functions: `transpose`
 * to transpose notes by any interval (or intervals by intervals) and `trFifths`
 * to transpose notes by fifths.
 *
 * @example
 * var tonal = require('tonal')
 * tonal.transpose('C3', 'P5') // => 'G3'
 * tonal.transpose('m2', 'P4') // => '5d'
 * tonal.trFifths('C', 2) // => 'D'
 *
 * @module transpose
 */
function trBy (i, p) {
  var t = tonalPitch.pType(p);
  if (!t) return null
  var f = tonalPitch.fifths(i) + tonalPitch.fifths(p);
  if (tonalPitch.isPC(p)) return ['tnlp', [f]]
  var o = tonalPitch.focts(i) + tonalPitch.focts(p);
  if (t === 'note') return ['tnlp', [f, o]]
  var d = tonalPitch.height(i) + tonalPitch.height(p) < 0 ? -1 : 1;
  return ['tnlp', [d * f, d * o], d]
}

/**
 * Transpose notes. Can be used to add intervals. At least one of the parameter
 * is expected to be an interval. If not, it returns null.
 *
 * @param {String|Pitch} a - a note or interval
 * @param {String|Pitch} b - a note or interavl
 * @return {String|Pitch} the transposed pitch or null if not valid parameters
 * @example
 * var _ = require('tonal')
 * // transpose a note by an interval
 * _.transpose('d3', '3M') // => 'F#3'
 * // transpose intervals
 * _.transpose('3m', '5P') // => '7m'
 * // it works with pitch classes
 * _.transpose('d', '3M') // => 'F#'
 * // order or parameters is irrelevant
 * _.transpose('3M', 'd3') // => 'F#3'
 * // can be partially applied
 * _.map(_.transpose('3M'), 'c d e f g') // => ['E', 'F#', 'G#', 'A', 'B']
 */
function transpose (a, b) {
  if (arguments.length === 1) return function (b) { return transpose(a, b) }
  var pa = tonalPitch.asPitch(a);
  var pb = tonalPitch.asPitch(b);
  var r = tonalPitch.isIvlPitch(pa) ? trBy(pa, pb)
    : tonalPitch.isIvlPitch(pb) ? trBy(pb, pa) : null;
  return a === pa && b === pb ? r : tonalPitch.strPitch(r)
}

/**
 * Transpose a tonic a number of perfect fifths. It can be partially applied.
 *
 * @function
 * @param {Pitch|String} tonic
 * @param {Integer} number - the number of times
 * @return {String|Pitch} the transposed note
 * @example
 * import { trFifths } from 'tonal-transpose'
 * [0, 1, 2, 3, 4].map(trFifths('C')) // => ['C', 'G', 'D', 'A', 'E']
 * // or using tonal
 * tonal.trFifths('G4', 1) // => 'D5'
 */
function trFifths (t, n) {
  if (arguments.length > 1) return trFifths(t)(n)
  return function (n) {
    return transpose(t, tonalPitch.pitch(n, 0, 1))
  }
}

exports.transpose = transpose;
exports.trFifths = trFifths;

},{"tonal-pitch":16}]},{},[1]);
