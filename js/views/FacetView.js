define(function(require) {
  var templateName          = 'FacetView';
  var templateMarkup        = require('text!templates/FacetView.dust');
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
    update: function(facetData) {
      var x = facetData;
      var buckets = facetData.buckets.values;
      var bucket;
      var bucketElements = $('li', this.el);
      
      var labels = $('.label', this.el);
      var counts = $('.count', this.el);

      var label;
      var count;

      bucketElements.each(function(idx) {
        bucket = buckets[idx];
        label = $('.label', this);
        count = $('.count', this);

        if(!bucket) {
          $(this).removeClass('active');
        } else {
          // bucket.code "F"
          // bucket.count 28
          // bucket.name "1st Connections"
          // bucket.selected true

          label.html(bucket.name);
          count.html(bucket.count);
          $(this).addClass('active');
        }
      });        
    }
  });
});