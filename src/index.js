'use strict'

class SideMenu {
	constructor(aside, nav = 'nav') {
		this.menu = document.querySelector(aside)

		if (!this.menu) {
			throw new Error('✖ Missing aside')
		}

		this.nav = this.menu.querySelector(nav)

		if (!this.nav) {
			throw new Error('✖ Missing nav')
		}

		this.startX = 0
		this.currentX = 0
		this.touching = false

		this.update = this.update.bind(this)
		this.addEvents()
	}

	addEvents() {
		this.menu.addEventListener('touchstart', this, this.applyPassive())
		this.menu.addEventListener('touchmove', this, this.applyPassive())
		this.menu.addEventListener('touchend', this)
		this.menu.addEventListener('touchcancel', this)
		this.menu.addEventListener('click', this)
	}

	update() {
		if (this.touching === false) {
			return
		}
		requestAnimationFrame(this.update)
		const position = Math.min(0, this.currentX - this.startX)
		this.nav.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${position}, 0, 0, 1)`
	}

	onTouchstart(event) {
		if (this.menu.classList.contains('sidemenu--open') === false) {
			return
		}
		this.startX = event.touches[0].pageX
		this.currentX = this.startX
		this.touching = true
		requestAnimationFrame(this.update)
	}

	onTouchmove(event) {
		if (this.touching === false) {
			return
		}
		this.currentX = event.touches[0].pageX
	}

	onTouchend() {
		if (this.touching === false) {
			return
		}
		this.touching = false
		const position = Math.min(0, this.currentX - this.startX)
		this.nav.style.transform = ''
		if (position < 0) {
			this.close()
		}
	}

	onTouchcancel() {
		this.onTouchend()
	}

	onTransitionend() {
		this.menu.classList.remove('sidemenu--anima')
		this.menu.removeEventListener('transitionend', this)
	}

	onClick() {
		this.close()
	}

	open() {
		this.menu.classList.add('sidemenu--anima')
		this.menu.classList.add('sidemenu--open')
		this.menu.addEventListener('transitionend', this)
	}

	close() {
		this.menu.classList.add('sidemenu--anima')
		this.menu.classList.remove('sidemenu--open')
		this.menu.addEventListener('transitionend', this)
	}

	handleEvent(event) {
		const ev = `${event.type.charAt(0).toUpperCase()}${event.type.slice(1)}`
		if (this[`on${ev}`]) {
			this[`on${ev}`](event)
		}
	}

	applyPassive() {
		if (this.supportsPassive !== undefined) {
			return this.supportsPassive ? {passive: true} : false
		}
		let isSupported = false
		try {
			document.addEventListener('test', null, {
				get passive() {
					isSupported = true
				}
			})
		} catch (err) {
			console.log(err)
		}
		this.supportsPassive = isSupported
		return this.applyPassive()
	}
}

export default SideMenu
