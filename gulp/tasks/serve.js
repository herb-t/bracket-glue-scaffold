'use strict';

/**
 * @fileoverview Defines the `gulp serve` task, which compiles sass/js and
 * starts up a browsersync proxy to port 9090 (default jc port), opens it in
 * the default browser, and navigates to the landing page.
 */

const constants = require('../constants');
const gulp = require('gulp');
const bs = require('browser-sync').get('bs');
const compress = require('compression');
const argv = require('yargs').argv;

module.exports = () => {
  /**
   * Registers the `gulp serve` that opens browser-sync after building.
   */
  gulp.task('serve', ['build'], function() {
    bs.init({
      // Proxy requests to a local server running jc.
      proxy: {
        target: 'http://127.0.0.1:8080'
      },
      notify: false,
      startPath: argv.startPath || constants.startPath,
      open: false,
      middleware: [compress()],
      serveStatic: [{
        route: '/b',
        dir: './'
      }]
    });
  });
};
