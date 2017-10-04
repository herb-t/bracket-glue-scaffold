'use strict';

/**
 * @fileoverview Defines gulp testing tasks, which start a Karma server and
 * run Javascript tests.
 */

const gulp = require('gulp');
const path = require('path');
const Server = require('karma').Server;

module.exports = () => {
  let pathToKarmaConf = path.join(__dirname, '/../../src/karma.conf.js');

  gulp.task('karma', (done) => {
    new Server({
      configFile: pathToKarmaConf,
    }, done).start();
  });

  gulp.task('karma-once', (done) => {
    new Server({
      configFile: pathToKarmaConf,
      singleRun: true
    }, done).start();
  });
};
