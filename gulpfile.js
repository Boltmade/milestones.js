'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('default', function() {
  return gulp.src('milestones.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify())
    .pipe(concat('milestones.js'))
    .pipe(gulp.dest('bower-dist/'));
});
