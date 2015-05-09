document.addEventListener('DOMContentLoaded', function(){

	var debounce, gridSetter, masonryInit, msnry,
		getAction, showName, shareHandler,
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

	// setup masonry grid
	gridSetter = function() {
		if (window.matchMedia('(min-width: 1400px)').matches && container) {
			msnry = new Masonry( container, {
				itemSelector: '.project',
				gutter: 16
			});
			masonryInit = true;
			msnry.layout();
		} else if (masonryInit) {
			msnry.destroy();
			masonryInit = false;
		} 

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

	shareHandler = function () {
		var shareButtons = document.getElementsByClassName('share');
			len = shareButtons.length,
			i;
		for(i = 0; i < len; i++) {
			shareButtons[i].addEventListener('click', function(e){
				e.preventDefault();
				var element = e.target,
					listBoxId = element.getAttribute('href');
				
				listBoxId = listBoxId.slice(1, listBoxId.length);

				if(element.className.indexOf('active') > -1) {
					element.className = 'share icon-share';
				} else {
					element.className = 'share icon-share active';
				}
				
				document.getElementById(listBoxId).setAttribute('tabindex', '-1');
				document.getElementById(listBoxId).focus();
				
				msnry.layout();
			})

			shareButtons[i].addEventListener('blur', function(e){
				console.log(e);
			})
		}

	};

	// setting up event listeners for the 2 pages
	if (container) {
		// this section happens on the portfolio
		window.addEventListener('resize', debounce(gridSetter, 250));
		imagesLoaded(container, function() { gridSetter(); });
		shareHandler();

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
					element = e.target.getAttribute('type') ? e.target : e.target.parentElement;
					if(element.className.indexOf('active') > -1) {
						element.className = '';
					} else {
						element.className = 'active';
						console.log(element.nextSibling);
						element.nextElementSibling.setAttribute('tabindex', '-1');
						element.nextElementSibling.focus();
					}

					
				}
			});
		}
	}

	document.addEventListener('scroll', debounce(showName, 100));

});