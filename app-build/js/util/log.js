define(function(a){var b=window.location.search.indexOf("debug")!==-1;return function(a){console&&"log"in console&&b&&console.log(a)}})