'use strict'

const uglify = require('uglify-js')

/**
 * Compress JS using UglifyJS.
 * @public
 * @param {?String} str - JS.
 * @param {?Object} opts - Options for the task.
 * @returns {Promise<String>} Compressed JS.
 */
module.exports = async function(str, opts) {

	if (str==null || str==='') return ''

	// Skip task when output should not be optimized
	if (opts!=null && opts.optimize===false) return str

	const result = uglify.minify(str)

	if (result.error!=null) throw result.error

	return result.code

}