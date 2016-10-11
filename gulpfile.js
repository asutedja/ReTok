
'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
 
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