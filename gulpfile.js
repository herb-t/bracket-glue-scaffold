'use strict';

var path = require('path');
var recursiveReadSync = require('recursive-readdir-sync');
var browserSync = require('browser-sync').create('bs');


/**
 * Reads the gulp directory and requires every js file to register tasks.
 */
recursiveReadSync('./gulp/tasks')
    .filter(file => path.extname(file) === '.js')
    .forEach(file => require(path.join(__dirname, file))());
