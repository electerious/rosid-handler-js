'use strict'

const assert   = require('chai').assert
const uglifyjs = require('./../src/uglifyjs')

describe('uglifyjs()', function() {

	it('should return an empty string when called without parameters', function() {

		return uglifyjs(null, null).then((result) => {

			assert.strictEqual(result, '')

		})

	})

	it('should return an empty string when called with an empty JS string', function() {

		const input = ``

		return uglifyjs(input, null).then((result) => {

			assert.strictEqual(result, '')

		})

	})

	it('should return the input when called with incorrect JS and optimization disabled', function() {

		const input = `return`
		const opts  = { optimize: false }

		return uglifyjs(input, opts).then((result) => {

			assert.strictEqual(result, input)

		})

	})

	it('should return the input when called with valid JS and optimization disabled', function() {

		const input = `function test() { return 'test'; }`
		const opts  = { optimize: false }

		return uglifyjs(input, opts).then((result) => {

			assert.strictEqual(result, input)

		})

	})

	it('should return an error when called with incorrect JS', function() {

		const input = `return`

		return uglifyjs(input, null).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

	it('should return JS when called with valid JS', function() {

		const input = `function test() { return 'test'; }`

		return uglifyjs(input, null).then((result) => {

			assert.isString(result)

		})

	})

})