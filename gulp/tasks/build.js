'use strict';

const gulp = require('gulp');
const logger = require('./../logger');
const divider = Array(73).fill('*').join('');

/**
 * Registers the `gulp build` and `gulp build:kokoro` tasks that build and lint
 * the front end for the project.
 */
module.exports = () => {

  // Build for running locally.
  gulp.task('build',  ['js', 'sass', 'lint:js', 'lint:sass']);

  // Build for running on Kokoro CI and failing with the proper exit code.
  gulp.task('build:kokoro',
      ['js', 'sass', 'lint:js', 'lint:sass'], function() {
    if (logger.errors.length) {
      logger.log('build:kokoro',
          '\n' + divider + '\n\n' +
          '                       😭 Kokoro build failed. 😭' +
          '\n\n' + divider);
      process.exit(1);
    } else {
      logger.log('build:kokoro',
          '\n' + divider + '\n\n' +
          '                       🔥 Kokoro build passed! 🔥' +
          '\n\n' + divider);
    }
  });
};
