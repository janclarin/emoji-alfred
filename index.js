'use strict';
const alfy = require('alfy');
const emoji = require('emojilib');

const emojiEntries = Object.entries(emoji.lib);
const noMatchesAlfredResult = {
	title: 'No emoji matches for ' + alfy.input
};

function toAlfredResult(emojiEntry) {
	const key = emojiEntry[0];
	const emojiObj = emojiEntry[1];
	const emojiChar = emojiObj.char;
	return {
		title: emojiChar,
		subtitle: convertUnderscoresToSpaces(key),
		arg: emojiChar,
		text: {
			copy: emojiChar,
			largetype: emojiChar
		}
	};
}

/**
 * Used because emojilib keys use underscores.
 */
function convertSpacesToUnderscores(str) {
	return str.replace(/ +/g, '_');
}

function convertUnderscoresToSpaces(str) {
	return str.replace(/_/g, ' ');
}

function isMatch(str, query) {
	return str.startsWith(query);
}

function getMatches(query) {
	return emojiEntries.filter(entry => {
		const key = entry[0];
		const keywords = entry[1].keywords;
		return isMatch(key, query) || keywords.some(word => isMatch(word, query));
	});
}

const query = convertSpacesToUnderscores(alfy.input);
const matches = getMatches(query);
if (matches.length > 0) {
	alfy.output(matches.map(toAlfredResult));
} else {
	alfy.output([noMatchesAlfredResult]);
}
