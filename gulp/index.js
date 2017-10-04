'use strict';

var path = require('path');
var recursiveReadSync = require('recursive-readdir-sync');
var browserSync = require('browser-sync').create('bs');



/**
 * Reads the gulp directory and requires every js file to register tasks.
 */
recursiveReadSync(path.join(__dirname, 'tasks'))
    .filter(file => {
      console.log(file);
      return path.extname(file) === '.js';
    })
    .forEach(file => {
      console.log('ay', file, require(file)());
    });
