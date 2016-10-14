var path = require('path');
var webpack = require('webpack');




module.exports = {
devtool:'#cheap-module-source-map', 
 entry: ['./client/src/App.js'],
  output: { path: __dirname + '/client', filename: 'bundle.js', sourceMapFilename:'sourceMap.map' },
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
