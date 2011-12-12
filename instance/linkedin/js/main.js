require.config({
  paths: {
    //jQuery      : 'libs/jquery/jquery',
    //Underscore  : 'libs/underscore/underscore',
    //Backbone    : 'libs/backbone/backbone',
    //Dust        : 'libs/dust/dust',    
  }
});

define(function(require) {
  var app = require('app');
  app.initialize();
});

// NOTE: the above is equivalent to this:
//
// define(['app.js', 'b.js'], function(app, b) {  
//   app.initialize();
// });
