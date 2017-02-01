'use strict'

const uglifyjs = require('uglify-js')

/*
 * Compress JS using UglifyJS.
 * @public
 * @param {?String} str - JS.
 * @param {?Object} opts - Options for the task.
 */
module.exports = function(str, opts) {

	return new Promise((resolve, reject) => {

		// Do nothing when called with an empty string
		if (str==null || str==='') return resolve('')

		// Skip task when output should not be optimized
		if (opts!=null && opts.optimize===false) return resolve(str)

		// Reduce size of JS
		const result = uglifyjs.minify(str, { fromString: true })

		resolve(result.code)

	})

}