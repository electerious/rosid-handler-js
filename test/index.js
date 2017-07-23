'use strict'

const path = require('path')
const assert = require('chai').assert
const uuid = require('uuid/v4')
const index = require('./../src/index')

// Files must be in cwd so babel can load the plugins and presents
const fsify = require('fsify')({
	persistent: false
})

describe('index()', function() {

	it('should return an error when called without a filePath', async function() {

		return index().then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.strictEqual(`'filePath' must be a string`, err.message)

		})

	})

	it('should return an error when called with invalid options', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => {}'
			}
		])

		return index(structure[0].name, '').then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.strictEqual(`'opts' must be undefined, null or an object`, err.message)

		})

	})

	it('should return an error when called with a fictive filePath', async function() {

		return index(`${ uuid() }.js`).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return an error when called with an invalid JS file', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: '='
			}
		])

		return index(structure[0].name).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should load JS and transform it to JS', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => {}'
			}
		])

		const result = await index(structure[0].name)

		assert.isString(result)

	})

	it('should load JS and transform it to optimized JS when optimization enabled', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => {}'
			}
		])

		const result = await index(structure[0].name, { optimize: true })

		assert.isString(result)

	})

	describe('.in()', function() {

		it('should be a function', function() {

			assert.isFunction(index.in)

		})

		it('should return a default extension', function() {

			assert.strictEqual(index.in(), '.js')

		})

		it('should return a default extension when called with invalid options', function() {

			assert.strictEqual(index.in(''), '.js')

		})

		it('should return a custom extension when called with options', function() {

			assert.strictEqual(index.in({ in: '.jsx' }), '.jsx')

		})

	})

	describe('.out()', function() {

		it('should be a function', function() {

			assert.isFunction(index.in)

		})

		it('should return a default extension', function() {

			assert.strictEqual(index.out(), '.js')

		})

		it('should return a default extension when called with invalid options', function() {

			assert.strictEqual(index.out(''), '.js')

		})

		it('should return a custom extension when called with options', function() {

			assert.strictEqual(index.out({ out: '.jsx' }), '.jsx')

		})

	})

	describe('.cache', function() {

		it('should be an array', function() {

			assert.isArray(index.cache)

		})

	})

})