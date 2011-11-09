define([
  'Backbone',
  'models/Item'
],
function(Backbone, Item) {  
  return Backbone.Collection.extend({
    model: Item
  });
});