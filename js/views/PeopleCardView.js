define(function(require) {
  var templateName          = 'PeopleCardView';
  var templateMarkup        = require('text!templates/PeopleCardView.dust');
  var channel               = require('util/channel');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({  
    tagName: 'li',  
    events: {},
    initialize: function() {
      _.bindAll(
        this, 
        'render', 
        'unrender',
        'renderAsync',
        'update');     
        
      this.context = {};          
    },
    render: function() {
      return this;
    },
    renderAsync: function(cb) {
      var el = $(this.el);  
      var cb = (typeof cb === 'function') ? cb : function() {};          

      dust.render(templateName, this.context, function(err, out) {
        el.html(out);
        cb(el);
      });

      return this;
    },
    unrender: function() {
      $(this.el).remove();
      return this;
    },
    update: function(bucketData) {
     
    }
  });
});