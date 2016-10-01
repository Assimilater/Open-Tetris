// Open links externally by default: http://stackoverflow.com/a/34503175/310560
var shell = require('electron').shell;
$(document).on('click', 'a[href^="http"]', function(event) {
	event.preventDefault();
	shell.openExternal(this.href);
});

// http://stackoverflow.com/a/4541963/310560
$.debounce = (function () {
	var timers = {};
	return function (key, ms, callback) {
		if (timers[key]) {
			clearTimeout(timers[key]);
		}
		timers[key] = setTimeout(callback, ms);
	};
})();

// http://stackoverflow.com/a/12034334/310560
$.escapeHtml = function(text) {
	var entityMap = {
		//'&': '&amp;',
		'&': '&', // We want to preserve this character for urls
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		//'/': '&#x2F;',
		'/': '/', // We want to preserve this character for urls
		'\n': '<br />',
	};
	return text.replace(/[&<>"'\/\n]/g, function (s) {
		return entityMap[s];
	});
};

// http://stackoverflow.com/a/1500501/310560
$.urlify = function(text) {
	var urlRegex = /(https?:\/\/[^\s]+)/g;
	return text.replace(urlRegex, '<a href="$1">$1</a>');
};
