'use strict'

const fs     = require('fs')
const path   = require('path')
const assert = require('chai').assert
const temp   = require('temp').track()
const index  = require('./../src/index')

const newFile = function(content, suffix) {

	// File must be in current dir so babel-register can load the plugins and presents
	const file = temp.openSync({
		dir    : __dirname,
		suffix : suffix
	})

	fs.writeFileSync(file.path, content)

	return file.path

}

describe('index()', function() {

	it('should return an error when called without a filePath', function() {

		return index(null).then((data) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

	it('should return an error when called with invalid options', function() {

		const file = newFile('const fn = () => {}', '.js')

		return index(file, '').then((data) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

	it('should return an error when called with a fictive filePath', function() {

		return index('test.js').then((data) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

	it('should return an error when called with an invalid JS file', function() {

		const file = newFile('=', '.js')

		return index(file).then((data) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

	it('should load JS and transform it to JS', function() {

		const file = newFile('const fn = () => {}', '.js')

		return index(file).then((data) => {

			assert.isString(data)

		})

	})

	it('should load JS and transform it to optimized JS when optimization enabled', function() {

		const file = newFile('const fn = () => {}', '.js')

		return index(file, { optimize: true }).then((data) => {

			assert.isString(data)

		})

	})

	describe('.in()', function() {

		it('should be a function', function() {

			assert.isFunction(index.in)

		})

		it('should return a default extension', function() {

			assert.strictEqual(index.in(), 'js')

		})

		it('should return a default extension when called with invalid options', function() {

			assert.strictEqual(index.in(''), 'js')

		})

		it('should return a custom extension when called with options', function() {

			assert.strictEqual(index.in({ in: 'jsx' }), 'jsx')

		})

	})

	describe('.out()', function() {

		it('should be a function', function() {

			assert.isFunction(index.in)

		})

		it('should return a default extension', function() {

			assert.strictEqual(index.out(), 'js')

		})

		it('should return a default extension when called with invalid options', function() {

			assert.strictEqual(index.out(''), 'js')

		})

		it('should return a custom extension when called with options', function() {

			assert.strictEqual(index.out({ out: 'jsx' }), 'jsx')

		})

	})

	describe('.cache', function() {

		it('should be an array', function() {

			assert.isArray(index.cache)

		})

	})

})