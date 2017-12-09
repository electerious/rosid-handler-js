'use strict'

const browserify = require('browserify')
const babelify = require('babelify')
const envify = require('loose-envify/custom')

/**
 * Transform JS with Babel and bundle it using Browserify.
 * @public
 * @param {String} filePath - Path to the JS file.
 * @param {?Object} opts - Options for the task.
 * @returns {Promise<String>} Transformed and bundled JS.
 */
module.exports = async function(filePath, opts) {

	const env = (opts!=null && opts.optimize===true) ? { NODE_ENV: 'production' } : {}

	// Use custom options when available or default options as a fallback
	const babelOpts = (opts!=null && typeof opts.babel==='object') ? opts.babel : {
		presets: [ 'env', 'react' ],
		babelrc: false
	}

	// Use custom options when available or default options as a fallback
	const browserifyOpts = (opts!=null && typeof opts.browserify==='object') ? opts.browserify : {
		debug: true
	}

	// Browserify should run envify on all required files
	const envifyOpts = {
		global: true
	}

	return new Promise((resolve, reject) => {

		const next = (err, result) => {

			if (err!=null) return reject(err)

			resolve(result.toString())

		}

		browserify(filePath, browserifyOpts)
			.transform(babelify, babelOpts)
			.transform(envify(env), envifyOpts)
			.bundle(next)

	})

}