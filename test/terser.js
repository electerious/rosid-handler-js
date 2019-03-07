'use strict'

const assert = require('chai').assert
const terser = require('./../src/terser')

describe('terser()', function() {

	it('should return the input when called with valid JS and optimization disabled', async function() {

		const input = `function test() { return 'test'; }`
		const result = await terser(input, { optimize: false })

		assert.strictEqual(result, input)

	})

	it('should return an error when called with incorrect JS', async function() {

		const input = 'return'

		return terser(input, { optimize: true }).then(() => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return JS without a source map when called with valid JS', async function() {

		const input = `const test = () => true`
		const result = await terser(input, { optimize: true })

		assert.isString(result)
		assert.notInclude(result, '//# sourceMappingURL')

	})

})