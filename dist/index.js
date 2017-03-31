(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.SideMenu = factory());
}(this, (function () { 'use strict';

var SideMenu = function SideMenu(aside, nav) {
	if ( nav === void 0 ) nav = 'nav';

	this.menu = document.querySelector(aside);

	if (!this.menu) {
		throw new Error('✖ Missing aside')
	}

	this.nav = this.menu.querySelector(nav);

	if (!this.nav) {
		throw new Error('✖ Missing nav')
	}

	this.startX = 0;
	this.currentX = 0;
	this.touching = false;

	this.update = this.update.bind(this);
	this.addEvents();
};

SideMenu.prototype.addEvents = function addEvents () {
	this.menu.addEventListener('touchstart', this, this.applyPassive());
	this.menu.addEventListener('touchmove', this, this.applyPassive());
	this.menu.addEventListener('touchend', this);
	this.menu.addEventListener('touchcancel', this);
	this.menu.addEventListener('click', this);
};

SideMenu.prototype.update = function update () {
	if (this.touching === false) {
		return
	}
	requestAnimationFrame(this.update);
	var position = Math.min(0, this.currentX - this.startX);
	this.nav.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + position + ", 0, 0, 1)";
};

SideMenu.prototype.onTouchstart = function onTouchstart (event) {
	if (this.menu.classList.contains('sidemenu--open') === false) {
		return
	}
	this.startX = event.touches[0].pageX;
	this.currentX = this.startX;
	this.touching = true;
	requestAnimationFrame(this.update);
};

SideMenu.prototype.onTouchmove = function onTouchmove (event) {
	if (this.touching === false) {
		return
	}
	this.currentX = event.touches[0].pageX;
};

SideMenu.prototype.onTouchend = function onTouchend () {
	if (this.touching === false) {
		return
	}
	this.touching = false;
	var position = Math.min(0, this.currentX - this.startX);
	this.nav.style.transform = '';
	if (position < 0) {
		this.close();
	}
};

SideMenu.prototype.onTouchcancel = function onTouchcancel () {
	this.onTouchend();
};

SideMenu.prototype.onTransitionend = function onTransitionend () {
	this.menu.classList.remove('sidemenu--anima');
	this.menu.removeEventListener('transitionend', this);
};

SideMenu.prototype.onClick = function onClick () {
	this.close();
};

SideMenu.prototype.open = function open () {
	this.menu.classList.add('sidemenu--anima');
	this.menu.classList.add('sidemenu--open');
	this.menu.addEventListener('transitionend', this);
};

SideMenu.prototype.close = function close () {
	this.menu.classList.add('sidemenu--anima');
	this.menu.classList.remove('sidemenu--open');
	this.menu.addEventListener('transitionend', this);
};

SideMenu.prototype.handleEvent = function handleEvent (event) {
	var ev = "" + (event.type.charAt(0).toUpperCase()) + (event.type.slice(1));
	if (this[("on" + ev)]) {
		this[("on" + ev)](event);
	}
};

SideMenu.prototype.applyPassive = function applyPassive () {
	if (this.supportsPassive !== undefined) {
		return this.supportsPassive ? {passive: true} : false
	}
	var isSupported = false;
	try {
		document.addEventListener('test', null, {
			get passive() {
				isSupported = true;
			}
		});
	} catch (err) {
		console.log(err);
	}
	this.supportsPassive = isSupported;
	return this.applyPassive()
};

return SideMenu;

})));
//# sourceMappingURL=index.js.map
