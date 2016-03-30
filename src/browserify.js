'use strict'

let browserify = require('browserify')

/*
 * Transform JS with Babel and bundle it using Browserify.
 * @public
 * @param {string} filePath - Path to the JS file.
 * @param {Object} opts - Options for the task.
 * @param {function} next - The callback that handles the response. Receives the following properties: err, js.
 */
module.exports = function(filePath, opts, next) {

	browserify(filePath, {

		debug: true

	}).transform('babelify', {

		presets: [ 'es2015', 'react' ]

	}).bundle((err, result) => {

		if (err!=null) {
			next(err, null)
			return false
		}

		next(null, result.toString())

	})

}