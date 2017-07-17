'use strict'

const path = require('path')
const assert = require('chai').assert
const uuid = require('uuid/v4')
const browserify = require('./../src/browserify')

const fsify = require('fsify')({
	cwd: __dirname,
	persistent: false
})

describe('browserify()', function() {

	it('should return an error when called with a fictive filePath', async function() {

		return browserify('test.js', null).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return JS when called without a valid filePath', async function() {

		const result = await browserify(null, null)

		assert.isString(result)

	})

	it('should return JS when called with a valid JS file', async function() {

		const structure = [
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => process.env.NODE_ENV'
			}
		]

		const file = (await fsify(structure))[0].name
		const result = await browserify(file, null)

		assert.isString(result)

	})

	it('should return untranspiled JS when called with a valid JS file and custom babel options', async function() {

		const structure = [
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => true'
			}
		]

		const file = (await fsify(structure))[0].name
		const result = await browserify(file, { babel: {} })

		assert.include(result, structure[0].contents)

	})

	it('should return JS and replace process.env.NODE_ENV when optimize is true', async function() {

		const structure = [
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => process.env.NODE_ENV'
			}
		]

		const file = (await fsify(structure))[0].name
		const result = await browserify(file, { optimize: true })

		assert.include(result, 'production')

	})

	it('should return JS and not replace process.env.NODE_ENV when optimize is false', async function() {

		const structure = [
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: 'const fn = () => process.env.NODE_ENV'
			}
		]

		const file = (await fsify(structure))[0].name
		const result = await browserify(file, { optimize: false })

		assert.include(result, 'process.env.NODE_ENV')

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

		return browserify(file, null).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

})