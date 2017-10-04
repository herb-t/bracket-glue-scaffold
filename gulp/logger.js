'use strict';

/**
 * @fileoverview Exports a logger function that prettifies output to the console
 * with colors and consistent task info and messaging for errors, successes, or
 * benign logs, and includes an option to produce a native OS notification.
 */

const chalk = require('chalk');
const colors = require('colors');
const util = require('gulp-util');
const notifier = require('node-notifier');
const _ = require('lodash');
const fs = require('fs');
const stripAnsi = require('strip-ansi');
const columnify = require('columnify');
const path = require('path');

var logger = {};

const logoPath = path.join(__dirname, 'bracket-logo.png');

logger.errors = [];

logger.log = function(task, message, info, notify) {

  var tpl = '[${task}] ${message}';

  var output = _.template(tpl)({
    chalk: chalk,
    task: chalk.blue(task),
    message: message
  });

  util.log(output);

  if (!!info) {
    format(info);
  }

  if (!!notify) {
    notifier.notify({
      title: formatTaskNameForNotification(task),
      message: stripAnsi(message),
      contentImage: logoPath
    });
  }
};

logger.error = function(task, message, info, notify) {

  logger.errors.push({
    task,
    message
  });

  var tpl = '[${task}] Error // ${message}';

  var output = _.template(tpl)({
    chalk: chalk,
    task: chalk.red(task),
    message: chalk.cyan(message)
  });

  util.log(output);

  if (!!info && _.isString(info)) {
    console.log(info);
  } else if (!!info && _.isObject(info)) {
    format(info);
  }

  if (!!notify) {
    notifier.notify({
      title: ' ' + formatTaskNameForNotification(task) + ' Error',
      message: stripAnsi(message),
      contentImage: logoPath
    });
  }
};

logger.success = function(task, message, info, notify) {

  var tpl = '[${task}] Success // ${message}';

  var output = _.template(tpl)({
    chalk: chalk,
    task: chalk.green(task),
    message: message
  });

  util.log(output);

  if (!!info) {
    format(info);
  }

  if (!!notify) {
    notifier.notify({
      title: ' ' + formatTaskNameForNotification(task),
      message: stripAnsi(message),
      icon: logoPath,
    });
  }
};

/**
 * Takes an object and outputs it to the console in a neatly formatted table
 * surrounded by newlines.
 *
 * @param info {Object} A js object of key:value pairs.
 * @param keys {Array} An array of key names to pick from object.
 */
function format(info, keys) {

  var keys = (!keys) ? Object.keys(info) : keys;

  var filtered = _.pick(info, keys);

  var columns = columnify(filtered, {
    showHeaders: false,
    preserveNewLines: true,
    config: {
      key: {
        dataTransform: function(data) {
          return data + ':';
        }
      }
    }
  });

  console.log('\n' + columns + '\n');

};


function formatTaskNameForNotification(task) {
  if (task == 'js') { return 'Javascript'; }
  if (task == 'ts') { return 'Typescript'; }
  if (task == 'sass') { return 'Sass'; }
  return task;
}

module.exports = exports = logger;
