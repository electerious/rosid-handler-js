'use strict'

const crypto     = require('crypto')
const fs         = require('fs')
const assert     = require('chai').assert
const temp       = require('temp').track()
const browserify = require('./../src/browserify')

const newFile = function(content, suffix) {

	// Create file in __dirname so Babel can load its presets
	const file = temp.openSync({
		dir    : __dirname,
		suffix : suffix
	})

	fs.writeFileSync(file.path, content)

	return file.path

}

describe('browserify()', function() {

	it('should return an error when called with a fictive filePath', function() {

		return browserify('test.js', null).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return JS when called without a valid filePath', function() {

		return browserify(null, null).then((result) => {

			assert.isString(result)

		})

	})

	it('should return JS when called with a valid JS file', function() {

		const file = newFile(`const fn = () => process.env.NODE_ENV`, '.js')

		return browserify(file, null).then((result) => {

			assert.isString(result)

		})

	})

	it('should return untranspiled JS when called with a valid JS file and custom babel options', function() {

		const input = `const fn = () => true`
		const file = newFile(input, '.js')

		return browserify(file, { babel: {} }).then((result) => {

			assert.include(result, input)

		})

	})

	it('should return JS and replace process.env.NODE_ENV when optimize is true', function() {

		const file = newFile(`const fn = () => process.env.NODE_ENV`, '.js')

		return browserify(file, { optimize: true }).then((result) => {

			assert.include(result, 'production')

		})

	})

	it('should return JS and not replace process.env.NODE_ENV when optimize is false', function() {

		const file = newFile(`const fn = () => process.env.NODE_ENV`, '.js')

		return browserify(file, { optimize: false }).then((result) => {

			assert.include(result, 'process.env.NODE_ENV')

		})

	})

	it('should return an error when called with an invalid JS file', function() {

		const file = newFile(`=`, '.js')

		return browserify(file, null).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

})