'use strict'

const fs         = require('fs')
const assert     = require('chai').assert
const temp       = require('temp').track()
const browserify = require('./../src/browserify')

let validFile   = null
let invalidFile = null

describe('browserify()', function() {

	before(function() {

		validFile = temp.openSync({
			dir    : __dirname,
			suffix : '.js'
		})

		fs.writeFileSync(validFile.path, `const fn = () => {}`)

		invalidFile = temp.openSync({
			dir    : __dirname,
			suffix : '.js'
		})

		fs.writeFileSync(invalidFile.path, `=`)

	})

	it('should return an error when called with a fictive filePath', function() {

		return browserify('test.js', null).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

	it('should return JS when called without a valid filePath', function() {

		return browserify(null, null).then((result) => {

			assert.isString(result)

		})

	})

	it('should return JS when called with a valid JS file', function() {

		return browserify(validFile.path, null).then((result) => {

			assert.isString(result)

		})

	})

	it('should return an error when called with an invalid JS file', function() {

		return browserify(invalidFile.path, null).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

})