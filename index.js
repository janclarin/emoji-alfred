'use strict';
const alfy = require('alfy');
const emoji = require('emojilib');

const emojiEntries = Object.entries(emoji.lib);
const noMatchesAlfredResult = {
	title: 'No emoji matches for ' + alfy.input
};

function toAlfredResult(emojiEntry) {
	const emojiObj = emojiEntry[1];
	const emojiChar = emojiObj.char;
	return {
		title: emojiChar,
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
const matches = getMatches(query).map(toAlfredResult);
if (matches.length > 0) {
	alfy.output(matches);
} else {
	alfy.output([noMatchesAlfredResult]);
}
