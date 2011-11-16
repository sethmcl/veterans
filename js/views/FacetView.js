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
        'renderAsync',
        'update',
        'toggleBucket');    

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
        bucket.facetCode = facetData.code;
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
        peopleSearchInput.addCohort(data.facet, data.code);
      } else {
        peopleSearchInput.removeCohort(data.facet, data.code);
      }
      
    }
  });
});