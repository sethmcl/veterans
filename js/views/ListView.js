define([
  'lib/models/Item', 
  'lib/collections/List',
  'lib/views/ItemView',
  'text!lib/tmpl/ListView.dust'
], 
function(Item, List, ItemView, ListTemplate) {

  dust.loadSource(dust.compile(ListTemplate, 'ListTemplate'));

  return Backbone.View.extend({
    el: $('body'),

    events: {
      'click button#add': 'addItem'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'addItem');

      this.collection = new List();
      this.collection.bind('add', this.appendItem);

      this.counter = 0;
      this.render();
    },

    render: function() {
      var el = $(this.el);

      dust.render('ListTemplate', {}, function(err, out) {
        el.append(out);
      });

      _(this.collection.models).each(function(item) {
        appendItem(item);
      }, this);
    },

    addItem: function() {
      this.counter++;
      var item = new Item();

      item.set({
        part2: item.get('part2') + this.counter
      });

      this.collection.add(item);    
    },

    appendItem: function(item) {
      var itemView = new ItemView({ model: item });
      $('ul', this.el).append(itemView.render().el);      
    }
  });

  

  return self;
});
