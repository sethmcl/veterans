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
      'click li a'    :   'toggleBucket'
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
      var bucketsDisplayedCount = 0;

      var friendlyNames = {
        'location'        :   'Where they live...',
        'industry'        :   'What they do...',
        'network'         :   'Related to you...',
        'language'        :   'Languages they speak...',
        'current-company' :   'Where they work...',
        'past-company'    :   'Where they used to work...',
        'school'          :   'Where they go to school...'
      };

      var exemptCodes = [ 'us:0' ];
      

      if(facetData && facetData.buckets && facetData.buckets.values) {
        buckets = facetData.buckets.values;
      } else {
        buckets = [];
      }

      $('.name', this.el).html(friendlyNames[facetData.code.toLowerCase()]);

      max = _.max(buckets, function(b) {
        if(b && b.count && exemptCodes.indexOf(b.code) === -1) {
          return b.count;
        } else {
          return 0;
        }        
      });

      if(max && max.count) {
        max = max.count;
      } else {
        max = 0;
      }     
            
      _.each(this.bucketViews, function(view, idx) {
        bucket = buckets[idx];

        if(bucket && exemptCodes.indexOf(bucket.code) === -1 && bucketsDisplayedCount < 9) {
          bucket.facetCode = facetData.code;
          bucket.percentage = bucket.count / max;
          view.update(bucket);    
          bucketsDisplayedCount++;    
        }
      });        
    },
    toggleBucket: function(e) {
      log('facet bucket clicked');
      var target    = $(e.target);
      var dataJSON  = target.closest('a').attr('data-bucket');
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