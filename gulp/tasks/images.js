'use strict';

const gulp = require('gulp');
const _ = require('lodash');
const constants = require('../constants');
const logger = require('../logger');
const path = require('path');
const tap = require('gulp-tap');


/**
 * Registers the `gulp images` which generates images resized images
 * from source_images directory.
 */
module.exports = () => {
  let responsive;

  // Attempt to require gulp-responsive. If it can not be found,
  // return without registering the images task.
  try {
    responsive = require('gulp-responsive');
  } catch (e) {
    return;
  }

  gulp.task('images', function() {

    /**
     * Appends the suffix to the pathObj's basename.
     *
     * @param {Object} pathObj
     * @param {string} suffix
     */
    const renameImage = (pathObj, suffix) => {
      pathObj.basename += suffix;

      logger.success('images', `Resized ${pathObj.basename.cyan} to _2x`);
      return pathObj;
    };

    return gulp.src(constants.imagesSrc)
      .pipe(tap(function(file, t) {
        logger.log('images', `Preparing to resize ${file.path.cyan}`);
      }))
      .pipe(responsive({
        '*.png': [
          {
            width: '100%',
            rename: pathObj => renameImage(pathObj, '_2x')
          },
          {
            width: '50%',
            rename: pathObj => renameImage(pathObj, '_1x')
          },
          {
            width: '25%',
            rename: pathObj => renameImage(pathObj, '_sm')
          }
        ],
        '*.jpg': [
          {
            width: '100%',
            quality: 80,
            progressive: true,
            rename: pathObj => renameImage(pathObj, '_2x')
          },
          {
            width: '50%',
            quality: 70,
            progressive: true,
            rename: pathObj => renameImage(pathObj, '_1x')
          },
          {
            width: '25%',
            quality: 80,
            progressive: true,
            rename: pathObj => renameImage(pathObj, '_sm')
          }
        ]
      }))
      .pipe(gulp.dest(constants.imagesDest));
  });
};
