// custom-preprocessor.js
'use strict';

const babel = require('babel-core');
const jestPreset = require('babel-preset-es2015');
const react = require('babel-preset-react')
<<<<<<< 2b9deea9e97b5afa3daaf6dc91fe8dcee63d566f
<<<<<<< 11d24f975a084d4a77b6cdc5433e53d3f0fc47e2
const stage = require('babel-preset-stage-1')
=======
>>>>>>> Rebase
=======
const stage = require('babel-preset-stage-1')
>>>>>>> Bring peerRTCConnection to our client unfunctionally
//const stage1 = require('webpack-dev-server')
//const stage = require('webpack-preset')

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
<<<<<<< 2b9deea9e97b5afa3daaf6dc91fe8dcee63d566f
<<<<<<< 11d24f975a084d4a77b6cdc5433e53d3f0fc47e2
        presets: [jestPreset, react, stage],
=======
        presets: [jestPreset, react],
>>>>>>> Rebase
=======
        presets: [jestPreset, react, stage],
>>>>>>> Bring peerRTCConnection to our client unfunctionally
        retainLines: true,
      }).code;
    }
    return src;
  },
};