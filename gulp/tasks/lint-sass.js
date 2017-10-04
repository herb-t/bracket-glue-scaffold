'use strict';

const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');
const logger = require('../logger');

/**
 * Registers the `gulp lint:sass` and `gulp lint:sass:legacy` tasks that lint
 * scss files for common style errors.
 */
module.exports = () => {
  gulp.task('lint:sass', () => {
    return gulp.src([`src/**/*.scss`])
        .pipe(sassLint())
        .pipe(sassLint.format());
  });
};
