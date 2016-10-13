
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var populateUserData = require('./__tests__/dbMockData').populateUserData;
var populateFriendshipData = require('./__tests__/dbMockData').populateFriendshipData;
var populateEmojiData = require('./__tests__/dbMockData').populateEmojiData;

gulp.task('compress', function (cb) {
  pump([
        gulp.src('./client/bundle.js'),
        uglify(),
        gulp.dest('./client')
    ],
    cb
  );
});


gulp.task('sass', function () {
  gulp.src('./client/styles/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/styles/css'));
});
 

gulp.task('sass:watch', function () {
  gulp.watch('./client/styles/scss/*.scss', ['sass']);
});

gulp.task('insertData', function(cb) {
  var mockUserData = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii', 'jjj', 'kkk', 'lll', 'mmm', 'nnn', 'ooo'];
  var mockEmojiData = [':church:', ':stuck_out_tongue_winking_eye:', ':disappointed:', ':cry:', ':frowning:', ':grimacing:', ':scream:', ':slight_smile:', ':tiger:', ':hamster:', ':thumbsup:', ':thumbsdown:'];
  populateUserData(mockUserData);
  setTimeout(function() {
    for (var i = 0; i < mockUserData.length * 4; i++) {
      populateFriendshipData(mockUserData.length);
    }
  }, 2000);
  setTimeout(function() {
    for (var i = 0; i < mockEmojiData.length; i++) {
      populateEmojiData(mockEmojiData[i]);
    }
  }, 2000);

});