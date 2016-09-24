// custom-preprocessor.js
'use strict';

const babel = require('babel-core');
const jestPreset = require('babel-preset-es2015');
const react = require('babel-preset-react')
//const stage1 = require('webpack-dev-server')
//const stage = require('webpack-preset')

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        presets: [jestPreset, react],
        retainLines: true,
      }).code;
    }
    return src;
  },
};