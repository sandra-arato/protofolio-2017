document.addEventListener('DOMContentLoaded', function(){

	console.log('start');
	var debounce, gridSetter, masonryInit, msnry, sticky, stickyInit;

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

	gridSetter = function() {
		var container = document.querySelector('#container .col5');
		
		if (window.matchMedia('(min-width: 1400px)').matches) {
			msnry = new Masonry( container, {
				itemSelector: '.project',
				gutter: 16
			});
			masonryInit = true;
		} else if (masonryInit) {
			msnry.destroy();
			masonryInit = false;
		} 

		// if (window.matchMedia('(min-width: 810px)').matches) {
		// 	sticky = document.querySelector('.col2');
		// 	stickyInit = new Sticky(sticky, {});
		// } else if (stickyInit) {
		// 	stickyInit.trigger('sticky:disable');
		// } else {
		// 	stickyInit.trigger('sticky:disable');
		// }


	};

	window.addEventListener('resize', debounce(gridSetter, 250));
	gridSetter();

	
});