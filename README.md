# rosid-handler-js

[![Travis Build Status](https://travis-ci.org/electerious/rosid-handler-js.svg?branch=master)](https://travis-ci.org/electerious/rosid-handler-js) [![Coverage Status](https://coveralls.io/repos/github/electerious/rosid-handler-js/badge.svg?branch=master)](https://coveralls.io/github/electerious/rosid-handler-js?branch=master) [![Dependencies](https://david-dm.org/electerious/rosid-handler-js.svg)](https://david-dm.org/electerious/rosid-handler-js#info=dependencies)

A function that loads a JS file and transforms, bundles and compresses its content.

## Install

```
npm install rosid-handler-js
```

## Usage

```js
const js = require('rosid-handler-js')

js('/src/main.js', '/src', '/dist', {}).then(({ data, savePath }) => {})
```

## Example

Add the following object to your `rosidfile.json`, `rosidfile.js` or [routes array](https://github.com/electerious/Rosid#routes). `rosid-handler-js` will transform, bundles and compresses all matching JS files in your source folder.

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

- `filePath` `{String}` Absolute path to the requested file.
- `srcPath` `{String}` Absolute path to the source folder.
- `distPath` `{?String}` Absolute path to the export folder.
- `route` `{Object}` The route which matched the request URL.

## Returns

- `{Promise}({Object})`
	- `data` `{String | Buffer}` The transformed file content.
	- `savePath` `{?String}` Where to save the file when compiling.