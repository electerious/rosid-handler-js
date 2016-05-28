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
 * @param {Function} next - The callback that handles the response. Receives the following properties: err, result, savePath.
 */
module.exports = function(filePath, srcPath, distPath, route, next) {

	let savePath = null

	const optimize = (distPath==null ? false : true)
	const opts     = { optimize }

	Promise.resolve().then(() => {

		// Prepare file paths

		savePath = filePath.replace(srcPath, distPath)

	}).then(() => {

		// Process data with browserify

		return browserify(filePath, opts)

	}).then((str) => {

		// Process data with uglifyjs

		return uglifyjs(str, opts)

	}).then(

		// Return processed data and catch errors
		// Avoid .catch as we don't want to catch errors of the callback

		(str) => next(null, str, savePath),
		(err) => next(err, null, null)

	)

}

/**
 * Attach an array to the function, which contains a list of
 * extensions used by the handler. The array will be used by Rosid for caching purposes.
 */
module.exports.cache = [
	'.js',
	'.json'
]