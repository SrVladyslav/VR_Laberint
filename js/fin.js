window.onload = function () {

	 function pageScroll() {
        window.scrollBy(0,1); // horizontal and vertical scroll increments
        scrolldelay = setTimeout(pageScroll(),1); // scrolls every 100 

	}
	setInterval( function() {
		//pageScroll();
	}, 1000);
}