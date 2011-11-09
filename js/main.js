require.config({
  paths: {
    jQuery:     'libs/jquery/jquery',
    Underscore: 'libs/underscore/underscore',
    Backbone:   'libs/backbone/backbone',
    Dust:       'libs/dust/dust',
    templates:  '../templates'
  }
});

require([
  //'views/ListView',

  'order!libs/jquery/jquery-1.7.min',
  'order!libs/underscore/underscore-debug',
  'order!libs/backbone/backbone-debug',
  //'//order!libs/dust/dust-full-0.3.0'
], function(ListView) {
  // Backbone.sync = function(method, model, success, error) {
  //   success();
  // }
  
  //var listView = new ListView();
});