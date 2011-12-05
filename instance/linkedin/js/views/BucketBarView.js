define(function(require) {
  var templateName          = 'BucketBarView';
  var templateMarkup        = require('text!templates/BucketBarView.dust');  
  var peopleSearchInput     = require('models/peopleSearchInput');
  var log                   = require('util/log');
  var channel               = require('util/channel');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({    
    tagName: 'div',
    events: {
      'click a' : 'removeBucket'
    },
    initialize: function() {
      _.bindAll(
        this, 
        'render', 
        'unrender', 
        'onSearchReturned', 
        'onSearchBegin',
        'onAddBucket',
        'onRemoveBucket',        
        'removeBucket'
      );    

      this.buckets = {};
      this.context = {
        buckets: []
      };      

      channel.sub('search', 'add-bucket', this.onAddBucket);
      channel.sub('search', 'remove-bucket', this.onRemoveBucket);

      channel.sub('search', 'search-returned', this.onSearchReturned);  
      channel.sub('search', 'search-begin', this.onSearchBegin);  
    },    
    render: function() {
      var el = $(this.el);                  
      var self = this;

      dust.render(templateName, this.context, function(err, out) {
        el.html(out);

        $('a', el).click(self.removeBucket);
      });

      return this;
    },
    unrender: function() {
      $(this.el).remove();
      return this;
    },
    onSearchReturned: function() {
      
    },
    onSearchBegin: function() {
      
    },
    onAddBucket: function(e) {
      var key       = e.data.facetCode + '-' + e.data.code;
      var data      = e.data;
      var dataJSON  = JSON.stringify(data);

      log('adding bucket to bucket bar: ' + key );

      data.json = dataJSON;
      this.buckets[key] = data;
      this.context.buckets = _.toArray(this.buckets);
      this.render();
    },
    onRemoveBucket: function(e) {
      var key   = e.data.facetCode + '-' + e.data.code;
      log('removing bucket from bucket bar: ' + key );
      delete this.buckets[key];
      this.context.buckets = _.toArray(this.buckets);      
      this.render();
    },
    removeBucket: function(e) {
      var target = $(e.target);

      var dataJSON  = target.attr('data-bucket');
      var data;

      try {
        data = JSON.parse(dataJSON);
      } catch(e) {
        log(e);
      }

      if(!data) return;
      channel.pub('search', 'remove-bucket', { data: data });   
    }    
  });
});