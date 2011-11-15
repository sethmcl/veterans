define(function(require) {
  var HeadView        = require('views/HeadView');
  var StatusView      = require('views/StatusView');
  var FacetListView   = require('views/FacetListView');
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
           
      this.views = {
        'statusView'    : new StatusView(),
        'headView'      : new HeadView(),
        'facetListView' : new FacetListView()
      };

      this.context = {};
    },
    render: function() {
      log('rendering loggedinview');
      dust.render(templateName, this.context, this.onDustRendered);
    },
    onDustRendered: function(err, out) {
      this.el.html(out);
      
      this.views['headView'].el = $('#head', this.el);
      this.views['headView'].render();

      this.views['facetListView'].el = $('#facet-list', this.el);
      this.views['facetListView'].render();

      this.views['statusView'].el = $('#status', this.el);
      this.views['statusView'].render();
    },    
    unrender: function() {
      $(this.el).remove();
    },
    keywordSearch: function() {
      searchInput.addFacets(['location', 'industry', 'current-company']);
      searchInput.set({ keywords: 'rochester' });
      // searchInput.addCohort('school', '32342');
      // searchInput.set({ keywords: 'test' });
    }
  });
});