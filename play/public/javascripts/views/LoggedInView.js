define(function(require) {
  var HeadView        = require('views/HeadView');
  var StatusView      = require('views/StatusView');
  var searchInput     = require('models/peopleSearchInput');
  var searchResults   = require('models/peopleSearchResults');
  var templateMarkup  = require('text!templates/logged-in.dust');
  var channel         = require('util/channel');
  var log             = require('util/log');

  var templateName    = 'logged-in';

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({
    el: $('#logged-in'),    
    events: {
      'click span.search': 'keywordSearch'
    },
    initialize: function(config) {
      _.bindAll(this, 'render', 'unrender', 'keywordSearch', 'onDustRendered');      
      this.statusView = new StatusView();
      this.headView = new HeadView();
      this.context = {};
    },
    render: function() {
      log('rendering loggedinview');
      dust.render(templateName, this.context, this.onDustRendered);
    },
    onDustRendered: function(err, out) {
      this.el.html(out);
      
      this.headView.el = $('#head', this.el);
      this.headView.render();

      this.statusView.el = $('#status', this.el);
      this.statusView.render();
    },    
    unrender: function() {
      $(this.el).remove();
    },
    keywordSearch: function() {
      searchInput.set({ keywords: 'rochester' });
      // searchInput.addCohort('school', '32342');
      // searchInput.set({ keywords: 'test' });
    }
  });
});