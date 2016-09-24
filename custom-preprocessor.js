// custom-preprocessor.js
'use strict';

const babel = require('babel-core');
const jestPreset = require('babel-preset-es2015');
const react = require('babel-preset-react')
const stage = require('babel-preset-stage-1')

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        presets: [jestPreset, react, stage],
        retainLines: true,
      }).code;
    }
    return src;
  },
};