# rosid-handler-js

[![Travis Build Status](https://travis-ci.org/electerious/rosid-handler-js.svg?branch=master)](https://travis-ci.org/electerious/rosid-handler-js) [![Coverage Status](https://coveralls.io/repos/github/electerious/rosid-handler-js/badge.svg?branch=master)](https://coveralls.io/github/electerious/rosid-handler-js?branch=master) [![Dependencies](https://david-dm.org/electerious/rosid-handler-js.svg)](https://david-dm.org/electerious/rosid-handler-js#info=dependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/electerious/rosid-handler-js.svg)](https://greenkeeper.io/)

A function that loads a JS file and transforms, bundles and compresses its content.

## Install

```
npm install rosid-handler-js
```

## Usage

### API

```js
const handler = require('rosid-handler-js')

handler('main.js').then((data) => {})
handler('main.js', { optimize: true }).then((data) => {})
```

### Rosid

Add the following object to your `rosidfile.json`, `rosidfile.js` or [routes array](https://github.com/electerious/Rosid/blob/master/docs/Routes.md). `rosid-handler-js` will transform, bundles and compresses all matching JS files in your source folder.

```json
{
  "name"    : "JS",
  "path"    : "[^_]*.js",
  "handler" : "rosid-handler-js"
}
```

```js
// main.js
export default () => 'Hello World'
```

```js
// main.js (output)
"use strict"
Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(){return"Hello World"}
```

## Parameters

- `filePath` `{String}` Absolute path to file.
- `opts` `{?Object}` Options.
	- `optimize` `{?Boolean}` - Optimize output. Defaults to `false`.
	- `env` `{?Object}` - Environment variables for [loose-envify](https://github.com/zertosh/loose-envify). Defaults to an object with `NODE_ENV` set to `production` when `optimize` is enabled.
	- `browserify` `{?Object}` - Browserify [options](https://github.com/browserify/browserify). Defaults to an object with `debug` enabled.
	- `babel` `{?Object}` - Babel [options](https://babeljs.io/docs/usage/api/). Defaults to an object with the presets [env](http://babeljs.io/docs/plugins/preset-env/) and [react](http://babeljs.io/docs/plugins/preset-react/).

## Returns

- `{Promise<String|Buffer>}` The transformed file content.