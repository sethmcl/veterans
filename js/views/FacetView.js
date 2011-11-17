define(function(require) {
  var templateName          = 'FacetView';
  var templateMarkup        = require('text!templates/FacetView.dust');
  var channel               = require('util/channel');
  var BucketView            = require('views/BucketView');
  var log                   = require('util/log');
  var peopleSearchInput     = require('models/peopleSearchInput');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({  
    tagName: 'li',  
    events: {
      'click li'    :   'toggleBucket'
    },
    initialize: function() {
      _.bindAll(
        this, 
        'render', 
        'unrender',
        'update',
        'toggleBucket',
        'onAddBucket',
        'onRemoveBucket'
      );    

      this.context = {};      
      this.bucketViews = [];
      channel.sub('search', 'add-bucket', this.onAddBucket);
      channel.sub('search', 'remove-bucket', this.onRemoveBucket);

      for(var i = 0; i < 10; i++) {
        this.bucketViews.push(new BucketView());
      }
    },
    render: function() {
      var el = $(this.el);  
      var ul;
      var bucketViews = this.bucketViews;

      dust.render(templateName, this.context, function(err, out) {
        el.html(out);
        ul = $('ul', el);
        
        _.each(bucketViews, function(view) {
          ul.append(view.render().el);
        });        
      });

      return this;
    },
    unrender: function() {
      $(this.el).remove();
      return this;
    },
    update: function(facetData) {      
      var buckets;
      var bucket;
      var max;

      if(facetData && facetData.buckets && facetData.buckets.values) {
        buckets = facetData.buckets.values;
      } else {
        buckets = [];
      }

      max = _.max(buckets, function(b) {
        return b.count;
      }).count;
            
      _.each(this.bucketViews, function(view, idx) {
        bucket = buckets[idx];
        bucket.facetCode = facetData.code;
        bucket.percentage = bucket.count / max;
        view.update(bucket);        
      });        
    },
    toggleBucket: function(e) {
      log('facet bucket clicked');
      var target    = $(e.target);
      var dataJSON  = target.attr('data-bucket');
      var data;

      try {
        data = JSON.parse(dataJSON);
      } catch(e) {
        log(e);
      }

      if(!data) return;

      //alert(data.facet);

      if(data.add) {
        channel.pub('search', 'add-bucket', { data: data });
      } else {
        channel.pub('search', 'remove-bucket', { data: data });
      }      
    },
    onAddBucket: function(e) {
      
    },
    onRemoveBucket: function(e) {
      
    }
  });
});