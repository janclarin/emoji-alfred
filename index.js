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

const matches = getMatches(alfy.input);
alfy.output(matches.map(toAlfredResult));
