'use strict'

const uglifyjs = require('uglify-js')

/*
 * Compress JS using UglifyJS.
 * @public
 * @param {?string} str - JS.
 * @param {?Object} opts - Options for the task.
 */
module.exports = function(str, opts) {

	// Do nothing when called with an empty string
	if (str==null || str==='') return Promise.resolve('')

	// Skip task when output should not be optimized
	if (opts!=null && opts.optimize===false) return Promise.resolve(str)

	return new Promise((resolve, reject) => {

		resolve(uglifyjs.minify(str, {
			fromString: true
		}))

	}).then((result) => {

		return result.code

	})

}