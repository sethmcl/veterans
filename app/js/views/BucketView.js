define(function(require) {
  var templateName          = 'BucketView';
  var templateMarkup        = require('text!templates/BucketView.dust');
  var channel               = require('util/channel');
  var log                   = require('util/log');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({  
    tagName: 'li',  
    events: {},
    initialize: function() {
      _.bindAll(
        this, 
        'render', 
        'unrender',
        'update',
        'toggleBucket');    

      this.context = {
        firstName: null
      };      
    },
    render: function() {
      var self = this;
      var el = $(this.el);      

      dust.render(templateName, this.context, function(err, out) {
        el.html(out);
        $('a', el).click(self.toggleBucket);             
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
      var graph = $('.graph', this.el);
      var data  = {};
      var addAction;
      var percentage;

      if(!bucketData) {
        $(this.el).removeClass('active');
        return;
      }
      
      data = {
        add       : !bucketData.selected,
        facetCode : bucketData.facetCode,
        code      : bucketData.code,
        name      : bucketData.name
      };

      $(this.el).toggleClass('selected', bucketData.selected);

      
      if(graph[0]) graph[0].style.width = 
        Math.min((bucketData.percentage * 100), 85) + '%';

      label.closest('a').attr('data-bucket', JSON.stringify(data));
      label.html(bucketData.name);
      count.html(bucketData.count);

      $(this.el).addClass('active');

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
    }
  });
});