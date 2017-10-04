goog.module('index');

// const EmojiComponent = goog.require('EmojiComponent');
const glueApp = goog.require('glue.app');
const glueCommon = goog.require('glue.ng.common');
const gluePagination = goog.require('glue.ng.pagination');
const glueCarousel = goog.require('glue.ng.carousel');
const glueCarouselBreakpoints = goog.require('glue.ng.carousel.breakpoints');
const glueAccordionStatic = goog.require('glue.ng.responsive.accordionStatic');
const glueYtVideo = goog.require('glue.ng.ytVideo');

const glueZippy = goog.require('glue.ng.zippy');
const glueZippySet = goog.require('glue.ng.zippy.set');
const glueZippyToggleAll = goog.require('glue.ng.zippy.toggleAll');

const hercHeader = goog.require('hercules.components.header');

// new EmojiComponent();

/** @type {!angular.Module} */
const module = angular.module('index', [
 glueCommon.module.name, // Progressive enhancement/browser detections.
 gluePagination.module.name,
 glueCarousel.module.name,
 glueCarouselBreakpoints.module.name,
 glueAccordionStatic.module.name,
 glueZippy.module.name,
 glueZippySet.module.name,
 glueZippyToggleAll.module.name,
 hercHeader.module.name,
 glueYtVideo.module.name
]);

// Conditionally start the app if it's a supported browser.
glueApp.bootstrap(module.name);
