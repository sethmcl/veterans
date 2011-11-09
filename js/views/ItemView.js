define(
[
  'Backbone',
  'Dust',
  'Underscore',
  'jQuery',  
  'text!templates/ItemView.dust'
], 

function(
  Backbone, 
  Dust, 
  _,
  $, 
  ItemTemplate
) {

  Dust.loadSource(dust.compile(ItemTemplate, 'ItemTemplate'));

  return Backbone.View.extend({
    tagName: 'li',

    events: {
      'click span.swap': 'swap',
      'click span.delete': 'remove'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'unrender', 'swap', 'remove');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function() {
      var el = $(this.el);

      var context = {
        part1: this.model.get('part1'), 
        part2: this.model.get('part2')
      };

      Dust.render('ItemTemplate', context, function(err, out) {
        el.html(out);
      });
      
      return this;
    },

    unrender: function() {
      $(this.el).remove();
    },

    swap: function() {
      var swapped = {
        part1: this.model.get('part2'),
        part2: this.model.get('part1')
      };
      this.model.set(swapped);
    },

    remove: function() {
      this.model.destroy();
    }
  }); 
});
