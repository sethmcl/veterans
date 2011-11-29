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
        'update');    

      this.context = {
        firstName: null
      };      
    },
    render: function() {
      var el = $(this.el);      

      dust.render(templateName, this.context, function(err, out) {
        el.html(out);      
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

      label.attr('data-bucket', JSON.stringify(data));
      label.html(bucketData.name);
      count.html(bucketData.count);

      $(this.el).addClass('active');

    }
  });
});