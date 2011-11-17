require.config({
  paths: {
    //jQuery:     'libs/jquery/jquery',
    //Underscore: 'libs/underscore/underscore',
    //Backbone:   'libs/backbone/backbone',
    //Dust:       'libs/dust/dust',
    templates:  '../templates'
  }
});

define(function(require) {
  var app = require('app');
  app.initialize();
});
