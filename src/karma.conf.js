module.exports = function(config) {
  config.set({
    // Base path that will be used to resolve all patterns (eg. files, exclude)
    // relative to the location of karma.conf.js.
    basePath: '.',

    // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter.
    frameworks: ['jasmine', 'closure'],

    // List of files / patterns to load in the browser.
    files: [
      // Closure stuffs.
      '../node_modules/google-closure-library/closure/goog/base.js',
      {
        pattern: '../node_modules/google-closure-library/closure/goog/deps.js',
        included: false,
        served: false,
      },
      // Library dependencies e.g. Angular, Lodash (none currently)
      // ...
      // The tests themselves.
      '**/*_test.js',
      // JavaScript sources.
      {
        pattern: '**/*.js',
        included: false,
      },
    ],

    // Files to exclude.
    exclude: [
      'static/js/*.min.js'
    ],

    preprocessors: {
      // External deps.
      '../node_modules/google-closure-library/closure/goog/deps.js':
          ['closure-deps'],
      // Source files are preprocessed for dependencies.
      '**/*.js': ['closure'],
    },

    // Test results reporter to use.
    // Possible values: 'dots', 'progress'
    // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    // Level of logging.
    // Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG.
    logLevel: config.LOG_ERROR,
    // Web server port.
    port: 9876,
    // Enable / disable colors in the output (reporters and logs).
    colors: true,

    // Continuous Integration mode. Enable / disable watching file and
    // executing tests whenever any file changes.
    singleRun: false,
    autoWatch: true,

    // Start these browsers.
    // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Define custom flags.
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security'],
      },
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--disable-gpu',
          '--headless',
          '--no-sandbox',
          '--remote-debugging-port=9222',
        ],
      }
    },
  });
};
