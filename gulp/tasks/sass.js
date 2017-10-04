/**
 * @fileoverview Defines the `gulp sass` task for compiling sass to minified
 * css with the option to output sourcemap comments and disable autoprefixer
 * with --dev flag.
 */

// Gulp dependencies
const gulp = require('gulp');
const util = require('gulp-util');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const tap = require('gulp-tap');
const cleanCss = require('gulp-clean-css');
const gulpif = require('gulp-if');
const merge = require('merge-stream');

const bs = require('browser-sync').get('bs');
const logger = require('../logger');
const constants = require('../constants');

// Node dependencies
const path = require('path');
const _ = require('lodash');
const notifier = require('node-notifier');
const colors = require('colors');
const chalk = require('chalk');
const moment = require('moment');
require('moment-duration-format');

const mode = constants.isProdMode ? 'prod' : 'dev';

const options = {};

// Not the prettiest way to track errors but it works.
let errors = 0;

/**
 * Prefixer plugin options.
 */
options.prefixer = {
  browsers: 'last 3 versions',
  cascade: false
};

/**
 * Sass compiler options.
 */
options.sass = {
  // Look for includes in node_modules directory.
  includePaths: [path.resolve(__dirname + '/../node_modules')],
  outputStyle: 'compact',
  sourceMap: true
};


const sassError = function(error) {
  const file = error.message.split('\n')[0];

  logger.error('sass', file, error, true);
  util.beep();

  // Increment error counter.
  errors += 1;

  // This is really important or the stream never ends.
  this.emit('end');
};


/**
 * Compiles one Sass file entry point.
 *
 * @param {string} file Path to scss file relative to root css dir.
 * @return {Object} Gulp stream object.
 */
const compileFile = function(project) {
  const src = project.src;
  const dest = project.dist;

  const data = {
    src: src,
    dest: dest,
    mode: mode
  };

  return gulp.src(src)
    // Start tracking source maps
    .pipe(sourcemaps.init())

    // Log what we are about to compile.
    .pipe(tap(function(file) {
        const str = _.template(
            'Compiling ${src.cyan} in ${mode.magenta} mode')({
              src: file.path.replace(process.cwd(), ''),
              mode: mode
            });
        logger.log('sass', str);
      }))

    // Compile with our options, and catch sass errors.
    .pipe(sass(options.sass).on('error', sassError))

    // Autoprefix our css output.
    .pipe(autoprefixer(options.prefixer))

    // Change name to include .min
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))

    // Minify if we are in prod mode.
    .pipe(
      gulpif((constants.isProdMode), cleanCss())
    )

    // If the sourcemap flag is passed, write sourcemap to output.
    .pipe(
      gulpif((util.env['css-sourcemaps']), sourcemaps.write())
    )

    .pipe(gulp.dest(dest))

    // Log the compilation for this file.
    .pipe(tap(function(file) {
      const str = _.template(
          'Compiled to ${dest.cyan} in ${mode.magenta} mode')({
            dest: file.path.replace(process.cwd(), ''),
            mode: mode
          });
      logger.log('sass', str);
    }))

    // Reload browsersync css
    .pipe(bs.reload({stream: true}));

};


/**
 * Registers the `gulp sass` task that compiles sass using the
 * main entry points about.
 */
module.exports = function() {

  gulp.task('sass', function() {

    // Create an array of each gulp stream.
    const streams = _.map(constants.sassSrc, compileFile);

    const start = moment();

    // Merge and return a combo stream.
    return merge(streams)
      .pipe(bs.reload({stream: true}))
      .on('end', function() {

        // Glean some data.
        const diff = moment().diff(start, 'milliseconds');
        const formatted = moment.duration(diff).format('s[ s]', 2);

        const data = {
          success: (streams.length - errors).toString().magenta,
          count: streams.length.toString().magenta,
          duration: formatted.magenta,
          errors: errors.toString().magenta
        };

        const slog = _.template(
            'Processed ${count} sass files in ${duration}, ' +
            'with ${errors} errors')(data);

        const elog = _.template(
            '${success} out of ${count} ' +
            'sass files compiled without errors')(data);

        if (errors === 0) {
          logger.success('sass', slog, null, true);
        } else {
          logger.log('sass', elog, null, true) && util.beep();
        }

        // Set error count to 0 to support watch task.
        errors = 0;
      });

  });
};
