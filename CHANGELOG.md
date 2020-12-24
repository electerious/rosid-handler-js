# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [13.0.2] - 2020-12-24

### Fixed

- Removed unused dependencies

## [13.0.1] - 2020-10-18

### Changed

- Updated dependencies

## [13.0.0] - 2020-03-20

### Changed

- Updated dependencies
- Only support Node.js 10+
- Test with Node.js 10 and 12

## [12.2.1] - 2020-01-31

### Changed

- Updated deps

## [12.2.0] - 2019-08-17

### New

- `env` option allows you to overwrite any environment variable you want

## [12.1.0] - 2019-03-07

### New

- Use `terser` instead of `uglify-js` to support ES6+ code

## [12.0.1] - 2019-02-23

### Fixed

- Optimize option should default to `false` which wasn't the case

## [12.0.0] - 2018-09-14

### Changed

- Updated to Babel 7

## [11.0.0] - 2018-08-25

### Changed

- Removed `prepublish` script from `package.json`
- Only support Node.js 8+

## [10.1.0] - 2017-12-08

### Added

- Added `browserify` option

### Changed

- Improved JSDoc annotation

### Fixed

- Assert parameter order in tests

## [10.0.1] - 2017-08-08

### Changed

- Ignore `yarn.lock` and `package-lock.json` files

## [10.0.0] - 2017-07-19

### Added

- Only support Node.js 7 and 8

### Changed

- Cache array contains glob patterns for Rosid 8.0