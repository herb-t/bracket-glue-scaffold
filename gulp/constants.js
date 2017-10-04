'use strict';

const argv = require('yargs').argv;
const path = require('path');
const util = require('gulp-util');

const settings = require('../package.json');

const compilerPath = 'node_modules/google-closure-compiler/compiler.jar';
const closurePath = 'node_modules/google-closure-library/closure/goog/';
const gluePath = 'node_modules/glue/google3/services/webmaster/goro/' +
    'templates/glue/releases/latest/';
const externsPath = 'node_modules/google-closure-compiler/contrib/externs/';


module.exports = {
  deps: [
    // Uncomment these lines in order to start using the Closure or Glue
    // libraries.
    path.join(closurePath, '**/*.js'),
    // Don't include Closure Library tests.
    '!' + path.join(closurePath, '**/*_test.js'),
    // Include all of Glue...
    path.join(gluePath, '**/*.js'),
    // ...except the tests.
    '!' + path.join(gluePath, '**/*_test.js'),
    // ...except the scss.
    '!' + path.join(gluePath, '**/scss/**/*.js'),
    // ...except the documentation site.
    '!' + path.join(gluePath, '**/site/**/*.js'),
    '!' + path.join(gluePath, '/test/**/*.js'),
    // ...except root nodejs files.
    '!' + path.join(gluePath, '*.js')
  ],
  externs: [
    // Include some common externs.
    path.join(externsPath, 'angular-1.5.js'),
    path.join(externsPath, 'angular-1.5-q_templated.js'),
    path.join(externsPath, 'angular-1.5-http-promise_templated.js'),
    path.join(externsPath, 'angular-1.5-resource.js'),
    path.join(externsPath, 'youtubeplayer.js')
  ],
  glueTemplatesSrc: [
    path.join(gluePath, '/hercules/components/modal/modal-template.html'),
    path.join(gluePath, '/hercules/components/tabset/tabset-template.html')
  ],
  glueTemplatesDest: 'src/js/templates',
  glueTemplatesEntry: 'index',
  paths: {
    COMPILER: compilerPath,
    CLOSURE: closurePath,
    GLUE: gluePath
  },
  jsSrc: [
    {
      entry:  'index',
      dist:   'src/static/js/index.min.js',
      src:    [
        'src/**/*.js',
        '!src/static/**/*.js',
      ]
    },
    {
      entry:  'herc.detect',
      dist:   'src/static/js/detect.min.js',
      src:    ['src/glue-detect-component/**/*.js']
      // deps: [
      //   path.join(closurePath, 'base.js'),
      //   // Don't include Closure Library tests.
      //   '!' + path.join(closurePath, '**/*_test.js'),
      //   path.join(gluePath, 'detect/**/*.js'),
      //   '!' + path.join(gluePath, 'detect/**/*_test.js')
      // ]
    }
  ],
  sassSrc: [{
    src: 'src/index.scss',
    dist: 'src/static/css'
  }],
  imagesSrc: 'src/images/**',
  imagesDest: 'src/static/images',
  root: '/',
  isDevMode: !util.env.prod,
  isProdMode: !!util.env.prod,
  startPath: '/'
};
