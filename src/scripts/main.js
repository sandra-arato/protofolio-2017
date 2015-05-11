document.addEventListener('DOMContentLoaded', function(){

	var debounce, smoothScroll, getAction, showName, shareHandler,
		container = document.querySelector('.portfolio .col5');

	debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	// smoothScroll = function(){

	// 	var smartScroller;

	// 	var links = document.querySelectorAll('a[href*="#"]:not([href="#"])'),
	// 		len = links.length,
	// 		i;
		
	// 	for(i = 0; i < len; i++) {
	// 		links[i].addEventListener('click', function(e){
	// 			var element = e.target;
				
	// 			if (location.pathname.replace(/^\//,'') == element.pathname.replace(/^\//,'') && location.hostname == element.hostname) {
	// 				var target = document.getElementById(element.hash.slice(1));
	// 				console.log(target.length);
	// 				target = target || document.querySelector('[name=' + element.hash.slice(1) +']');
	// 				if (target) {
	// 					console.log('hello');
	// 					smartScroller(document.body, target, 700);
	// 				}
	// 			}
	// 		});
	// 	}

	// 	smartScroller = function(element, target, duration) {
	// 		console.log('test');
	// 		target = Math.round(target);
	// 		duration = Math.round(duration);
	// 		if (duration < 0) {
	// 			return Promise.reject("bad duration");
	// 		}
	// 		if (duration === 0) {
	// 			element.scrollTop = target;
	// 			return Promise.resolve();
	// 		}

	// 		var start_time = Date.now(),
	// 			end_time = start_time + duration,
	// 			start_top = element.scrollTop,
	// 			distance = target - start_top,

	// 			// based on http://en.wikipedia.org/wiki/Smoothstep
	// 			smooth_step = function(start, end, point) {
	// 				if(point <= start) { return 0; }
	// 				if(point >= end) { return 1; }
	// 				var x = (point - start) / (end - start); // interpolation
	// 				return x*x*(3 - 2*x);
	// 			};

	// 		return new Promise(function(resolve, reject) {
	// 			var previous_top = element.scrollTop,

	// 				// This is like a think function from a game loop
	// 				scroll_frame = function() {
	// 					if(element.scrollTop != previous_top) {
	// 						reject("interrupted");
	// 						return;
	// 					}

	// 					// set the scrollTop for this frame
	// 					var now = Date.now();
	// 					var point = smooth_step(start_time, end_time, now);
	// 					var frameTop = Math.round(start_top + (distance * point));
	// 					element.scrollTop = frameTop;

	// 					// check if we're done!
	// 					if(now >= end_time) {
	// 						resolve();
	// 						return;
	// 					}

	// 					// If we were supposed to scroll but didn't, then we
	// 					// probably hit the limit, so consider it done; not
	// 					// interrupted.
	// 					if(element.scrollTop === previous_top
	// 						&& element.scrollTop !== frameTop) {
	// 						resolve();
	// 						return;
	// 					}
	// 					previous_top = element.scrollTop;

	// 					// schedule next frame for execution
	// 					setTimeout(scroll_frame, 0);
	// 				}
	// 			setTimeout(scroll_frame, 0);
	// 		});
	// 	};
	// };

	// skills page resume buttons handler 
	getAction = function (elem) {
		var type;
		if (elem.tagName.toLowerCase() === 'button' ) {
			type = elem.childNodes[0].innerHTML;
		} else {
			type = elem.innerHTML;
		}

		return type;
	};

	// scrolling triggers showing name in nav
	showName = function () {
		var headerName = document.querySelector('nav p');

		if (document.body.scrollTop > 150) {
			headerName.className = '';
		} else if (headerName.className === '') {
			headerName.className = 'noshow';
		}
	};

	shareHandler = function(e, classes) {
		e.preventDefault();

		var element = e.target.tagName.toLowerCase() !== 'span' ? e.target : e.target.parentElement;
		
		if(element.className.indexOf('active') > -1) {
			element.className = classes;
			element.setAttribute('aria-pressed', 'false');
			element.nextElementSibling.setAttribute('aria-hidden', 'true');
			element.focus();
		} else {
			element.className = classes + ' active';
			element.setAttribute('aria-pressed', 'true');
			element.nextElementSibling.setAttribute('aria-hidden', 'false');
			element.nextElementSibling.focus();				
		}
		
	}

	// setting up event listeners for the 2 pages
	if (container) {
		var shareButtons = document.querySelectorAll('a.share'),
			len = shareButtons.length,
			i;
		
		for(i = 0; i < len; i++) {
			shareButtons[i].addEventListener('click', function(e){
				shareHandler(e, 'share icon-share');
			});
			shareButtons[i].addEventListener('keyup', function(e){
				if (e.which === 32) {
					shareHandler(e, 'share icon-share');
				}
			});
		}
	} else {
		// this section happens on skills page
		var buttons = document.getElementsByTagName('button'),
			len = buttons.length,
			i;
		for (i = 0; i < len; i++ ) {
			buttons[i].addEventListener('click', function(e) {
				var element,
					type = getAction(e.target).toLowerCase().split(' ')[0];
				if (type === 'print') {
					print();
				} else {
					shareHandler(e, '');
				}
			});
		}
	}

	document.addEventListener('scroll', debounce(showName, 100));
});