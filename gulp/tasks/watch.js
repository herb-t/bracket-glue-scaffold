const gulp = require('gulp');
const bs = require('browser-sync').get('bs');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const batch = require('gulp-batch');
const merge = require('merge-stream');
const path = require('path');
const _ = require('lodash');

const constants = require('../constants');

/**
 * Registers the `gulp watch` task that compiles js, sass, starts browsersync,
 * begins watching templates, js, and sass code respectively, recompiling and
 * refreshing browsersync after changes.
 */
module.exports = () => {

  gulp.task('watch', ['serve'], () => {

    // Creat meh glob patterns.
    const sass = [`src/**/*.scss`, `!src/static/**/*.css`];
    const js = [`src/**/*.js`, `!src/static/**/*.js`];
    const markup = [
      `src/**/*.(py|jinja)`,
      `src/static/**/*`,
      `!src/static/**/*.(min.js|min.css)`,
    ];

    // Start watching.
    const sassStream = watch(sass, () => gulp.start(['sass', 'lint:sass']));

    const jsStream = watch(js, () => gulp.start(['js', 'lint:js']));

    const markupStream = watch(markup).on('change', bs.reload);

    return merge([sassStream, jsStream, markupStream]);
  });

};
