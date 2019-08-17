'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const browserify = require('./../src/browserify')

const fsify = require('fsify')({
	cwd: __dirname,
	persistent: false
})

describe('browserify()', function() {

	it('should return an error when called with a fictive filePath', async function() {

		return browserify('test.js', {}).then(() => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return JS when called without a valid filePath', async function() {

		const result = await browserify(null, {})

		assert.isString(result)

	})

	it('should return JS when called with a valid JS file', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => process.env.NODE_ENV'
			}
		])

		const result = await browserify(structure[0].name, {})

		assert.isString(result)

	})

	it('should return untranspiled JS when called with a valid JS file and custom babel options', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => true'
			}
		])

		const result = await browserify(structure[0].name, { babel: {} })

		assert.include(result, structure[0].contents)

	})

	it('should return JS without source maps when called with a valid JS file and custom browserify options', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => true'
			}
		])

		const result = await browserify(structure[0].name, { browserify: {} })

		assert.notInclude(result, 'sourceMappingURL')

	})

	it('should return JS and replace process.env.NODE_ENV when optimize is true', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => process.env.NODE_ENV'
			}
		])

		const result = await browserify(structure[0].name, { optimize: true })

		assert.include(result, 'production')

	})

	it('should return JS and not replace process.env.NODE_ENV when optimize is false', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => process.env.NODE_ENV'
			}
		])

		const result = await browserify(structure[0].name, { optimize: false })

		assert.include(result, 'process.env.NODE_ENV')

	})

	it('should return JS and replace process.env.TEST when called with a custom environment', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => process.env.TEST'
			}
		])

		const env = { TEST: uuid() }
		const result = await browserify(structure[0].name, { env })

		assert.include(result, env.TEST)

	})

	it('should return an error when called with an invalid JS file', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: '='
			}
		])

		return browserify(structure[0].name, {}).then(() => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

})