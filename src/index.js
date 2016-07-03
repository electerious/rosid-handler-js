'use strict'

const browserify = require('./browserify')
const uglifyjs   = require('./uglifyjs')

/*
 * Load, transform, bundle and compress JS.
 * @public
 * @param {String} filePath - Absolute path to the requested file.
 * @param {String} srcPath - Absolute path to the source folder.
 * @param {String} distPath - Absolute path to the export folder.
 * @param {Object} route - The route which matched the request URL.
 * @returns {Promise} Returns the following properties if resolved: {Object}.
 */
module.exports = function(filePath, srcPath, distPath, route) {

	let savePath = null

	const optimize = (distPath==null ? false : true)
	const opts     = { optimize }

	return Promise.resolve().then(() => {

		// Prepare file paths

		savePath = filePath.replace(srcPath, distPath)

	}).then(() => {

		// Process data with browserify

		return browserify(filePath, opts)

	}).then((str) => {

		// Process data with uglifyjs

		return uglifyjs(str, opts)

	}).then((str) => {

		return {
			data     : str,
			savePath : savePath
		}

	})

}

/**
 * Attach an array to the function, which contains a list of
 * extensions used by the handler. The array will be used by Rosid for caching purposes.
 */
module.exports.cache = [
	'.js',
	'.json'
]