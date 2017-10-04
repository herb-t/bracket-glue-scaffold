'use strict';


const jscs = require('gulp-jscs');
const gulp = require('gulp');
const _ = require('lodash');
const constants = require('../constants');


/**
 * Registers the `gulp lint:js` task that lints js files for style errors.
 */
module.exports = function() {
  const globs = ['gulp/**/*.js'];
  _.each(constants.jsSrc, (srcObj) => {
    globs.push(...srcObj.src);
  });
  gulp.task('lint:js', function() {
    return gulp.src(globs)
        .pipe(jscs({fix: false}))
        .pipe(jscs.reporter());
  });
};
