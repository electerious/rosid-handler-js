'use strict'

let fs         = require('fs'),
    async      = require('async'),
    browserify = require('./lib/browserify'),
    uglifyjs   = require('./lib/uglifyjs')

/*
 * Load, transform and compress JS.
 * @public
 * @param {string} filePath - Absolute path to the requested file.
 * @param {string} srcPath - Absolute path to the source folder.
 * @param {string} distPath - Absolute path to the export folder.
 * @param {object} route - The route which matched the request URL.
 * @param {function} next - The callback that handles the response. Receives the following properties: err, result, savePath.
 */
module.exports = function(filePath, srcPath, distPath, route, next) {

	let savePath = filePath.replace(srcPath, distPath)

	async.waterfall([

		(next)      => browserify(filePath, next),
		(str, next) => uglifyjs(str, next)

	], (err, str) => {

		if (err!=null) {
			next(err, null, null)
			return false
		}

		next(null, str, savePath)

	})

}