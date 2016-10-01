$(document).ready(function() {
	var resize_messages = function() {
		$('#conversation').width(
			$('#chat').width() - $('#participants').width() - 1
		);
	};

	$('#chat').resizable({
		handles: 'e',
		resize: function(event, ui) {
			var w = ui.size.width + 1; // 1 for the border
			$('#game').css('width', `calc(100% - ${w}px`);
			resize_messages();
		},
	});

	$('#participants').resizable({
		handles: 'e',
		resize: resize_messages,
	});

	var $mqueue = $('#mqueue');
	var $message = $('#chatbox textarea');
	var scroll = function() {
		$mqueue.scrollTop($mqueue.prop('scrollHeight'));
	};

	$('#chatbox button').button().click(function() {
		var message = $message.val();
		message = $.escapeHtml(message);
		message = $.urlify(message);

		$mqueue.append($('<div class="message">' + message + '</div>'));
		$message.val('');
		scroll();
	});

	$(window).resize(function() {
		$.debounce('win_resize', 500, scroll);
	});
});
