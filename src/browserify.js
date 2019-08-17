'use strict'

const browserify = require('browserify')
const babelify = require('babelify')
const envify = require('loose-envify/custom')

/**
 * Transform JS with Babel and bundle it using Browserify.
 * @public
 * @param {String} filePath - Path to the JS file.
 * @param {Object} opts - Options for the task.
 * @returns {Promise<String>} Transformed and bundled JS.
 */
module.exports = async function(filePath, opts) {

	const envDefault = opts.optimize === true ? { NODE_ENV: 'production' } : {}

	const babelDefaultOpts = {
		presets: [ '@babel/preset-env', '@babel/preset-react' ],
		babelrc: false
	}

	const browserifyDefaultOpts = {
		debug: true
	}

	const env = typeof opts.env === 'object' ? opts.env : envDefault
	const babelOpts = typeof opts.babel === 'object' ? opts.babel : babelDefaultOpts
	const browserifyOpts = typeof opts.browserify === 'object' ? opts.browserify : browserifyDefaultOpts
	const envifyOpts = { global: true }

	return new Promise((resolve, reject) => {

		const next = (err, result) => {

			if (err != null) return reject(err)

			resolve(result.toString())

		}

		browserify(filePath, browserifyOpts)
			.transform(babelify, babelOpts)
			.transform(envify(env), envifyOpts)
			.bundle(next)

	})

}