'use strict'

const browserify = require('browserify')
const babelify   = require('babelify')
const envify     = require('loose-envify/custom')

/*
 * Transform JS with Babel and bundle it using Browserify.
 * @public
 * @param {String} filePath - Path to the JS file.
 * @param {?Object} opts - Options for the task.
 */
module.exports = function(filePath, opts) {

	const env = (opts!=null && opts.optimize===true) ? { NODE_ENV: 'production' } : {}

	return new Promise((resolve, reject) => {

		browserify(filePath, {

			debug: true

		}).transform(babelify, {

			presets: [ 'latest', 'react' ]

		}).transform(envify(env, {

			global: true

		})).bundle((err, result) => {

			if (err!=null) return reject(err)

			return resolve(result.toString())

		})

	})

}