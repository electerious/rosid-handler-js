'use strict'

const browserify = require('browserify')

/*
 * Transform JS with Babel and bundle it using Browserify.
 * @public
 * @param {string} filePath - Path to the JS file.
 * @param {?Object} opts - Options for the task.
 */
module.exports = function(filePath, opts) {

	return new Promise((resolve, reject) => {

		browserify(filePath, {

			debug: true

		}).transform('babelify', {

			presets: [ 'es2015', 'react' ]

		}).bundle((err, result) => {

			if (err!=null) return reject(err)

			return resolve(result.toString())

		})

	})

}