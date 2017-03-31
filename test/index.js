/* eslint new-cap: 0 */

'use strict'

import test from 'ava'
// import simulant from 'simulant'
import classie from 'desandro-classie'
import SideMenu from '../src/.'

const docFrag = document.createDocumentFragment()

const aside = document.createElement('aside')
aside.id = 'menu'

const aside2 = document.createElement('aside')
aside2.id = 'menu2'

const nav = document.createElement('nav')
aside.appendChild(nav)

docFrag.appendChild(aside)
docFrag.appendChild(aside2)

document.body.appendChild(docFrag)
const sideMenu = new SideMenu('#menu')

test('instances', t => {
	t.true(sideMenu instanceof SideMenu)
})

test('exception', t => {
	t.throws(() => new SideMenu('#not'), '✖ Missing aside')
})

test('exception nav', t => {
	t.throws(() => new SideMenu('#menu2', '#not'), '✖ Missing nav')
})

test('open', t => {
	sideMenu.open()
	t.true(classie.has(sideMenu.menu, 'sidemenu--anima'))
	t.true(classie.has(sideMenu.menu, 'sidemenu--open'))
})

test('close', t => {
	sideMenu.onClick()
	t.true(classie.has(sideMenu.menu, 'sidemenu--anima'))
	t.false(classie.has(sideMenu.menu, 'sidemenu--open'))
})

// test('touchstart', t => {
// 	sideMenu.open()
// 	simulant.fire(sideMenu.menu, 'touchstart')
// 	t.true(classie.has(sideMenu.menu, 'sidemenu--open'))
// })
