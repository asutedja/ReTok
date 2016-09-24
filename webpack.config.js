var path = require('path');
var webpack = require('webpack');
// var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
// var APP_DIR = path.resolve(__dirname, '/client/src');


// var config = {
//   entry: ['react-hot-loader/patch',
//   'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
//   'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors,
//   './client/src/App.js'],
//   output: {
//     path: __dirname + '/client',
//     filename: 'bundle.js'
//   },
//   module : {
//     loaders : [
//       {
//         test : /\.js?/,
//         include : APP_DIR,
//         loader : 'babel-loader',
//         // query:
//         //   {
//         //     presets:['react']
//         //   }
//       },

//       // { 
//       //   test: /\.jsx?$/, 
//       //   loaders: ['react-hot'], 
//       //   include: path.join(__dirname, 'src') 
//       // }

//     ]
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin()
//   ]
// };

// module.exports = config; 



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
      },
    ]
  },
};