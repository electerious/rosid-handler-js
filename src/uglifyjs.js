'use strict'

let uglifyjs = require('uglify-js')

/*
 * Compress JS using UglifyJS.
 * @public
 * @param {string} str - JS.
 * @param {Object} opts - Options for the task.
 * @param {function} next - The callback that handles the response. Receives the following properties: err, js.
 */
module.exports = function(str, opts, next) {

	// Skip task when output should not be optimized
	if (opts.optimize===false) {
		next(null, str)
		return false
	}

	try {

		let result = uglifyjs.minify(str, {
			fromString: true
		})

		next(null, result.code)

	} catch (err) {

		next(err, null)

	}

}