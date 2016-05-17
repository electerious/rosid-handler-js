'use strict'

const fs     = require('fs')
const path   = require('path')
const assert = require('chai').assert
const temp   = require('temp').track()
const index  = require('./../src/index')

let validFile   = null
let invalidFile = null

describe('index()', function() {

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

	it('should return an error when called with a invalid filePath', function(done) {

		index(null, '/src', '/dist', null, (err, str, savePath) => {

			assert.isNotNull(err)

			done()

		})

	})

	it('should return an error when called with a fictive filePath', function(done) {

		index('test.js', '/src', '/dist', null, (err, str, savePath) => {

			assert.isNotNull(err)

			done()

		})

	})

	it('should return an error when called with an invalid JS file and everything else specified', function(done) {

		index(invalidFile.path, '/src', '/dist', null, (err, str, savePath) => {

			assert.isNotNull(err)

			done()

		})

	})

	it('should load JS and transform it to JS when everything specified', function(done) {

		index(validFile.path, '/src', '/dist', null, (err, str, savePath) => {

			assert.isNull(err)
			assert.isString(str)
			assert.isString(savePath)
			assert.strictEqual(savePath.substr(-3), '.js')

			done()

		})

	})

	it('should load JS and transform it to JS when distPath not specified', function(done) {

		index(validFile.path, '/src', null, null, (err, str, savePath) => {

			assert.isNull(err)
			assert.isString(str)
			assert.isString(savePath)
			assert.strictEqual(savePath.substr(-3), '.js')

			done()

		})

	})

	describe('.cache', function() {

		it('should be an array', function() {

			assert.isArray(index.cache)

		})

	})

})