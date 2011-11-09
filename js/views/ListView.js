define(
[
  'Backbone',
  'Dust',
  'jQuery',
  'Underscore',
  'models/Item', 
  'collections/List',
  'views/ItemView',
  'text!templates/ListView.dust'
], 

function(
  Backbone,
  Dust,
  $,
  _,
  Item, 
  List, 
  ItemView, 
  ListTemplate
) {

  Dust.loadSource(Dust.compile(ListTemplate, 'ListTemplate'));

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

      Dust.render('ListTemplate', {}, function(err, out) {
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
