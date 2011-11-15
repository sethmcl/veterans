define(function(require) {
  var templateName          = 'FacetView';
  var templateMarkup        = require('text!templates/FacetView.dust');
  var channel               = require('util/channel');
  var BucketView            = require('views/BucketView');

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

      this.bucketViews = [];

      for(var i = 0; i < 10; i++) {
        this.bucketViews.push(new BucketView());
      }
    },
    render: function() {
      return this;
    },
    renderAsync: function(cb) {
      var el = $(this.el);  
      var ul;
      var cb = (typeof cb === 'function') ? cb : function() {};          
      var bucketViews = this.bucketViews;

      dust.render(templateName, this.context, function(err, out) {
        el.html(out);
        ul = $('ul', el);
        _.each(bucketViews, function(view) {
          view.renderAsync(function(vEl) {
            ul.append(vEl);
          });
        });

        cb(el);
      });

      return this;
    },
    unrender: function() {
      $(this.el).remove();
      return this;
    },
    update: function(facetData) {      
      var buckets = facetData.buckets.values;
      var bucket;      
            
      _.each(this.bucketViews, function(view, idx) {
        bucket = buckets[idx];
        view.update(bucket);        
      });        
    }
  });
});