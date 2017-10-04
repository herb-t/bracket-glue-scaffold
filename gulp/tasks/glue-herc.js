'use strict';

/**
 * @fileoverview Defines the `gulp js` task which compiles all the minified js
 * for the project.
 *
 * No flags:
 *    Builds dependencies file that allows the browser to fetch/run
 *    source files uncompiled.
 *
 * `--prod` flag:
 *    Build a compiled js file suitable for production.
 *
 * `--prod --js-sourcemaps` flags:
 *    Will build a compiled file with a sourcemap base64 encoded into the end
 *    of the file.
 */

const gulp = require('gulp');
const util = require('gulp-util');
const templateCache = require('gulp-angular-templatecache');
const path = require('path');
const logger = require('../logger');
const constants = require('../constants');



/**
 * Registers the `gulp js` task that compiles js with local closure compiler.
 * @return A Gulp stream object.
 */
module.exports = () => {
  /**
   * Builds the detect script to be included if you want to use Hercules grid,
   * header, footer, etc. but not go all-in with Glue.
   */
  gulp.task('glue-herc:copy-herc-assets', () => {
    logger.success('js', 'copy-herc-assets!');

    return gulp.src(path.join(constants.paths.GLUE, 'hercules/assets/**/*'))
        .pipe(gulp.dest('src/static/herc-assets'));
  });

  // Grabs global hercules templates (for modal, tabby) and use in the test app.
  gulp.task('glue-herc:build-herc-templates', function() {
    logger.success('js', 'build-herc-templates!');

    gulp.src(constants.glueTemplatesSrc)
        .pipe(gulp.dest(constants.glueTemplatesDest));

    return gulp.src(constants.glueTemplatesSrc)
      .pipe(templateCache({
        // TODO:sullivanbrian@ -- make this better
          module: constants.jsSrc[0].entry,
          transformUrl: function(url) {
            return '/glue/' + url;
          }
        }
      ))
      .pipe(gulp.dest('src/js/templates'));
  });
};
