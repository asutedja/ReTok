var AWS = require('aws-sdk');
var fs = require('fs');
var multer = require('multer');
var crypto = require('crypto');
var env = require('./AWSconfig/environment');
var keys = require('./AWSconfig/keys');
var mime = require('mime');
var User = require('./db').User;
var passport = require('passport');
var session = require('express-session');
// We use the below storage attribute to assign our own
// file names rather than have multer assign some hexadecimal blabber
// http://stackoverflow.com/questions/32184589/renaming-an-uploaded-file-using-multer-doesnt-work-express-js
var storage = multer.diskStorage({
  // destination: function(req, file, cb) {
  //   cb(null, 'uploads/');
  // },
  // Randomize file name using below code
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });


module.exports = function(app) {

  app.post('/user/upload/profilephoto', upload.single('photo'), function(req, res) {

    console.log('checking my session passport', req.session);

    var userID = req.session.passport.user;

    AWS.config.update({
      accessKeyId: keys.AWS_ACCESS_KEY_ID,
      secretAccessKey: keys.AWS_SECRET_ACCESS_KEY 
    });

    AWS.config.region = env.region;

    var s3 = new AWS.S3({params: {Bucket: env.bucket}});


    var folder = require('./utils/randomString').generate(20);

    var file = fs.readFileSync(req.file.path);

    var filename = req.file.filename;



    var mediaUrl = 'https://s3-' + env.region + '.amazonaws.com/' + env.bucket + '/' + folder + '/' + filename;

    console.log('checking my mediaUrl -------> XOXOXOXOXO', mediaUrl);

    var params = {
      Bucket: env.bucket,
      Key: folder + '/' + filename,
      Body: file,
      ACL: 'public-read'
    };

    s3.putObject(params, function(err, data) {
      if (err) {
        console.log('i hit an error in uploadPhoto backend', err);
      } else {
        console.log('Successfully uploaded data to ' + env.bucket + '/' + folder + '/' + filename);
  
        // User.findAll({where: {id: userID}}).then(function(user) {
        //   console.log('confirming i have user information', user);

        //   user.profilePic = mediaUrl;

        //   User.save().then(function() {
        //     console.log('successfully saved to the user', user);
        //     res.status(200).send(user);
        //   });


        // });


        User.update(
          {
            profilePic: mediaUrl
          },
          {
            where: { id : userID }
          })
          .then(function (result) { 
            console.log('what is result', result);

            User.findAll({where: {id: userID}}).then(function(user) {
              res.status(200).send(user);
            });

          });




      }


    });

  });

};