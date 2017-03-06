if (!Cookies.get('community_modal')) {
	window.setTimeout(function() {
		$('#questions-nag-modal').modal('show');
		ga('send', 'event', 'questions_nag', 'show');
	}, 3000);
}

Cookies.set('community_modal', { expires: 7 });