'use strict'

const path = require('path')
const assert = require('chai').assert
const uuid = require('uuid/v4')
const index = require('./../src/index')

const fsify = require('fsify')({
	cwd: __dirname,
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

		const structure = [
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => {}'
			}
		]

		const file = (await fsify(structure))[0].name

		return index(file, '').then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.strictEqual(`'opts' must be undefined, null or an object`, err.message)

		})

	})

	it('should return an error when called with a fictive filePath', async function() {

		const file = `${ uuid() }.js`

		return index(file).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return an error when called with an invalid JS file', async function() {

		const structure = [
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: '='
			}
		]

		const file = (await fsify(structure))[0].name

		return index(file).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should load JS and transform it to JS', async function() {

		const structure = [
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => {}'
			}
		]

		const file = (await fsify(structure))[0].name
		const result = await index(file)

		assert.isString(result)

	})

	it('should load JS and transform it to optimized JS when optimization enabled', async function() {

		const structure = [
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => {}'
			}
		]

		const file = (await fsify(structure))[0].name
		const result = await index(file, { optimize: true })

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