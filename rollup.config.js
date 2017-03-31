'use strict'

import buble from 'rollup-plugin-buble'

export default {
	entry: 'src/index.js',
	format: 'umd',
	dest: 'dist/index.js',
	moduleName: 'SideMenu',
	plugins: [
		buble()
	],
	sourceMap: true
}
