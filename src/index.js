'use strict'

const browserify = require('./browserify')
const terser = require('./terser')

/**
 * Load, transform, bundle and compress JS.
 * @public
 * @param {String} filePath - Absolute path to file.
 * @param {?Object} opts - Options.
 * @returns {Promise<String>} JS.
 */
module.exports = async function(filePath, opts = {}) {

	if (typeof filePath !== 'string') throw new Error(`'filePath' must be a string`)
	if (typeof opts !== 'object') throw new Error(`'opts' must be undefined or an object`)

	opts = Object.assign({
		optimize: false
	}, opts)

	let output = null

	output = await browserify(filePath, opts)
	output = await terser(output, opts)

	return output

}

/**
 * Tell Rosid with which file extension it should load the file.
 * @public
 * @param {?Object} opts - Options.
 * @returns {String} File extension.
 */
module.exports.in = function(opts) {

	return (opts != null && opts.in != null) ? opts.in : '.js'

}

/**
 * Tell Rosid with which file extension it should save the file.
 * @public
 * @param {?Object} opts - Options.
 * @returns {String} File extension.
 */
module.exports.out = function(opts) {

	return (opts != null && opts.out != null) ? opts.out : '.js'

}

/**
 * Attach an array to the function, which contains a list of
 * file patterns used by the handler. The array will be used by Rosid for caching purposes.
 * @public
 */
module.exports.cache = [
	'**/*.js',
	'**/*.json'
]