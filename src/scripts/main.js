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