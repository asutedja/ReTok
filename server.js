var express = require('express');
var app = express();
var http = require('http').Server(app); //Should be https.  Change later after testing
var port = process.env.PORT || 3000;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
 publicPath: config.output.publicPath,
 hot: true,
 historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:3000/');
});



// app.use(express.static('client'));
// app.use(express.static(__dirname + '/../client/'));




// http.listen(port, function(data) {
//   console.log('listening on ' + port);

// });