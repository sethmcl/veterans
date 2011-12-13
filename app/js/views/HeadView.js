define(function(require) {
  var templateName          = 'HeadView';
  var templateMarkup        = require('text!templates/HeadView.dust');
  var peopleSearchResults   = require('models/peopleSearchResults');
  var channel               = require('util/channel');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({    
    tagName: 'div',
    events: {},
    initialize: function() {
      _.bindAll(
        this, 
        'render', 
        'unrender', 
        'onSearchReturned', 
        'onSearchBegin', 
        'onUserData');    

      this.context = {};

      channel.sub('search', 'search-returned', this.onSearchReturned);  
      channel.sub('search', 'search-begin', this.onSearchBegin);
      channel.sub('auth', 'user-data', this.onUserData);  
    },    
    render: function() {
      var el = $(this.el);     
      var context;
      
      context = window.headContext;      

      dust.render(templateName, context, function(err, out) {
        el.html(out);
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
    onUserData: function(data) {
      window.headContext.userData = data;
      //this.context.userData = data;
    }
  });
});