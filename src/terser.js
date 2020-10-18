'use strict'

const terser = require('terser')

/**
 * Compress JS using Terser.
 * @public
 * @param {String} str - JS.
 * @param {Object} opts - Options for the task.
 * @returns {Promise<String>} Compressed JS.
 */
module.exports = async function(str, opts) {

	// Skip task when output should not be optimized
	if (opts.optimize !== true) return str

	const result = await terser.minify(str)

	return result.code

}