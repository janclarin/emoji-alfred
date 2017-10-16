'use strict';
const alfy = require('alfy');
const emoji = require('emojilib');

const emojiEntries = Object.entries(emoji.lib);

function toAlfredResult(emojiEntry) {
	const key = emojiEntry[0];
	const emojiObj = emojiEntry[1];
	const emojiChar = emojiObj.char;
	return {
		title: emojiChar,
		subtitle: key.replace(/_/g, ' '),
		text: {
			copy: emojiChar,
			largetype: emojiChar
		}
	};
}

function isMatch(str, query) {
	return str.startsWith(query);
}

function isEmojiObjMatch(emojiObj, query) {
	return emojiObj.keywords.some(keyword => isMatch(keyword, query));
}

function getMatches(query) {
	return emojiEntries.filter(entry => {
		const key = entry[0];
		const emojiObj = entry[1];
		return isMatch(key, query) || isEmojiObjMatch(emojiObj, query);
	});
}

const query = alfy.input;
const matches = getMatches(query);
if (matches.length > 0) {
	alfy.output(matches.map(toAlfredResult));
} else {
	alfy.error('No emoji matches for query, ' + query);
}
