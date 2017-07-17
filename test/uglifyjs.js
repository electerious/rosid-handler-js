'use strict'

const assert   = require('chai').assert
const uglifyjs = require('./../src/uglifyjs')

describe('uglifyjs()', function() {

	it('should return an empty string when called without parameters', async function() {

		const result = await uglifyjs(null, null)

		assert.strictEqual(result, '')

	})

	it('should return an empty string when called with an empty JS string', async function() {

		const input = ``
		const result = await uglifyjs(input, null)

		assert.strictEqual(result, '')

	})

	it('should return the input when called with incorrect JS and optimization disabled', async function() {

		const input = `return`
		const opts  = { optimize: false }
		const result = await uglifyjs(input, opts)

		assert.strictEqual(result, input)

	})

	it('should return the input when called with valid JS and optimization disabled', async function() {

		const input = `function test() { return 'test'; }`
		const opts  = { optimize: false }
		const result = await uglifyjs(input, opts)

		assert.strictEqual(result, input)

	})

	it('should return an error when called with incorrect JS', function() {

		const input = `return`

		return uglifyjs(input, null).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return JS without a source map when called with valid JS', async function() {

		const input = `function test() { return 'test'; }`
		const result = await uglifyjs(input, null)

		assert.isString(result)
		assert.notInclude(result, '//# sourceMappingURL')

	})

})