'use strict';

const gulp = require('gulp');

/**
 * Registers the `gulp` task, used for spinning up a dev server and watching.
 */
module.exports = () => {

  gulp.task('default',  ['build', 'serve', 'watch']);

};
