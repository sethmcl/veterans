define([
  'lib/views/ListView'
],
function(ListView) {
  Backbone.sync = function(method, model, success, error) {
    success();
  }
  
  var listView = new ListView();
});