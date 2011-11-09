define(
[
  'Backbone'
],

function(Backbone) {
  return Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });

});