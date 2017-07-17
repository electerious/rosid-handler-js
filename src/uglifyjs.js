'use strict'

const uglifyjs = require('uglify-js')

/**
 * Compress JS using UglifyJS.
 * @public
 * @param {?String} str - JS.
 * @param {?Object} opts - Options for the task.
 * @returns {String} Returns the following properties if resolved: {String}.
 */
module.exports = async function(str, opts) {

	// Do nothing when called with an empty string
	if (str==null || str==='') return ''

	// Skip task when output should not be optimized
	if (opts!=null && opts.optimize===false) return str

	const result = uglifyjs.minify(str)

	if (result.error!=null) throw result.error

	return result.code

}