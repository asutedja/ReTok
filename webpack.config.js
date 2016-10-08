var path = require('path');
var webpack = require('webpack');




module.exports = {
  entry: ['./client/src/App.js'],
  output: { path: __dirname + '/client', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        include: __dirname,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      }
    ]
  },
};
