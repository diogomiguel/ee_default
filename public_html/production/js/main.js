//GLOBALS CACHED
var $html = $('html'),
		$win  = $(window),
		$doc  = $(document),
		ie7   = $html.hasClass('lt-ie8'),
		isWebkit = 'webkitRequestAnimationFrame' in window,
		controller = null,
		$body = $('body');
