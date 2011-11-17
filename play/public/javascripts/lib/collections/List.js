define([
  'lib/models/Item'
],
function(Item) {  
  return Backbone.Collection.extend({
    model: Item
  });
});