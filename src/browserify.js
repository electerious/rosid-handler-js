'use strict'

const browserify = require('browserify')
const babelify = require('babelify')
const envify = require('loose-envify/custom')

/**
 * Transform JS with Babel and bundle it using Browserify.
 * @public
 * @param {String} filePath - Path to the JS file.
 * @param {?Object} opts - Options for the task.
 * @returns {Promise} Returns the following properties if resolved: {String}.
 */
module.exports = async function(filePath, opts) {

	const env = (opts!=null && opts.optimize===true) ? { NODE_ENV: 'production' } : {}

	// Use custom options when available or default options as a fallback
	const babel = (opts!=null && typeof opts.babel==='object') ? opts.babel : {
		presets: [ 'env', 'react' ],
		babelrc: false
	}

	return new Promise((resolve, reject) => {

		browserify(filePath, {

			debug: true

		}).transform(babelify, babel).transform(envify(env), {

			global: true

		}).bundle((err, result) => {

			if (err!=null) return reject(err)

			resolve(result.toString())

		})

	})

}