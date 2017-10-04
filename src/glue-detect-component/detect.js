goog.module('herc.detect');

// const glueApp = goog.require('glue.app');
const glueDetect = goog.require('glue.detect');
const glueFlexbox = goog.require('glue.detect.flexbox');
// const glueDetectTouch = goog.require('glue.detect.touch');

glueDetect.decorateDom(glueFlexbox);
// glueDetect.decorateDom(glueDetectTouch);

// glueApp.blacklist({
//   'ie': 8,
//   'android': 3
// });
