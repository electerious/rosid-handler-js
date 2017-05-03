# rosid-handler-js

[![Greenkeeper badge](https://badges.greenkeeper.io/electerious/rosid-handler-js.svg)](https://greenkeeper.io/)

[![Travis Build Status](https://travis-ci.org/electerious/rosid-handler-js.svg?branch=master)](https://travis-ci.org/electerious/rosid-handler-js) [![AppVeyor Status](https://ci.appveyor.com/api/projects/status/dbl3yks4dh155gqb?svg=true)](https://ci.appveyor.com/project/electerious/rosid-handler-js) [![Coverage Status](https://coveralls.io/repos/github/electerious/rosid-handler-js/badge.svg?branch=master)](https://coveralls.io/github/electerious/rosid-handler-js?branch=master) [![Dependencies](https://david-dm.org/electerious/rosid-handler-js.svg)](https://david-dm.org/electerious/rosid-handler-js#info=dependencies)

A function that loads a JS file and transforms, bundles and compresses its content.

## Install

```
npm install rosid-handler-js
```

## Usage

### API

```js
const js = require('rosid-handler-js')

js('main.js').then((data) => {})
js('main.js', { optimize: true }).then((data) => {})
```

### Rosid

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

- `filePath` `{String}` Absolute path to file.
- `opts` `{?Object}` Options.
	- `optimize` `{?Boolean}` - Optimize output. Defaults to `false`.

## Returns

- `{Promise}({String|Buffer})` The transformed file content.