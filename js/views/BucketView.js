define(function(require) {
  var templateName          = 'BucketView';
  var templateMarkup        = require('text!templates/BucketView.dust');
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

      this.context = {
        firstName: null
      };      
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
      var label = $('.label', this.el);
      var count = $('.count', this.el);

      if(bucketData) {
        label.html(bucketData.name);
        count.html(bucketData.count);
        $(this.el).addClass('active');
      } else {
        $(this.el).removeClass('active');
      }

    }
  });
});