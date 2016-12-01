// (function(doc, win) {
// 	var docEl = doc.documentElement,
// 		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
// 		recalc = function() {
// 			var clientWidth = docEl.clientWidth;
// 			if (!clientWidth) return;
// 			if (clientWidth >= 640) {
// 				docEl.style.fontSize = '100px';
// 			} else {
// 				docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
// 			}
// 		};
//
// 	if (!doc.addEventListener) return;
// 	win.addEventListener(resizeEvt, recalc, false);
// 	doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);

var h = document.getElementsByTagName('html')[0];
var beforeRootFontSize = window.getComputedStyle(h, null).getPropertyValue('font-size');
var defaultFontSize;

function adapt(designWidth, rem2px) {
	var d = window.document.createElement('div');
	d.style.width = '1rem';
	d.style.display = "none";
	var head = window.document.getElementsByTagName('head')[0];
	head.appendChild(d);
	var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
	d.remove();
	document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
	var st = document.createElement('style');
	var portrait = "@media screen and (min-width: " + window.innerWidth + "px) {html{font-size:" + ((window.innerWidth / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}";
	var landscape = "@media screen and (min-width: " + window.innerHeight + "px) {html{font-size:" + ((window.innerHeight / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}"
	st.innerHTML = portrait + landscape;
	head.appendChild(st);
	return defaultFontSize
};
defaultFontSize = adapt(640, 100);
var afterRootFontSize = window.getComputedStyle(h, null).getPropertyValue('font-size');
