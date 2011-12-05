define(function(require) {
  var templateName          = 'StatusView';
  var templateMarkup        = require('text!templates/StatusView.dust');
  var peopleSearchResults   = require('models/peopleSearchResults');
  var channel               = require('util/channel');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({  
    tagName: 'div',  
    events: {},
    initialize: function() {
      _.bindAll(this, 'render', 'unrender', 'onSearchReturned', 'onSearchBegin');    

      this.context = {};
      channel.sub('search', 'search-returned', this.onSearchReturned);  
      channel.sub('search', 'search-begin', this.onSearchBegin);  
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
    onSearchReturned: function() {
      this.context.peopleSearchResults = peopleSearchResults.toJSON();

      if(this.context.peopleSearchResults.peopleCount >= 1000) {
        this.context.countText = 'more than 1000';
      } else {
        this.context.countText = this.context.peopleSearchResults.peopleCount;
      }
      
      this.context.searchInProgress = false;      
      this.render();
    },
    onSearchBegin: function() {
      this.context.searchInProgress = true;
      this.render();
    }
  });
});