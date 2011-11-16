define(function(require) {
  var templateName          = 'StatusView';
  var templateMarkup        = require('text!templates/StatusView.dust');
  var peopleSearchResults   = require('models/peopleSearchResults');
  var channel               = require('util/channel');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({    
    events: {},
    initialize: function() {
      _.bindAll(this, 'render', 'unrender', 'onSearchReturned', 'onSearchBegin');    

      this.context = {
        // searchInProgress: false,
        // peopleCount: 0
      };

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
      this.context.searchInProgress = false;
      this.context.peopleCount = this.context.peopleSearchResults.length;
      this.render();
    },
    onSearchBegin: function() {
      this.context.searchInProgress = true;
      this.render();
    }
  });
});