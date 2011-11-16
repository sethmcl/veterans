define(function(require) {
  var HeadView        = require('views/HeadView');
  var StatusView      = require('views/StatusView');
  var FacetListView   = require('views/FacetListView');
  var PeopleListView  = require('views/PeopleListView');
  var searchInput     = require('models/peopleSearchInput');
  var searchResults   = require('models/peopleSearchResults');
  var templateMarkup  = require('text!templates/LoggedInView.dust');
  var channel         = require('util/channel');
  var log             = require('util/log');

  var templateName    = 'LoggedInView';

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({
    el: $('#logged-in-view'),    
    events: {
      'click .search': 'keywordSearch'
    },
    initialize: function(config) {
      _.bindAll(this, 'render', 'unrender', 'keywordSearch', 'onDustRendered'); 
           
      this.views = {
        'statusView'    : new StatusView(),
        'headView'      : new HeadView(),
        'facetListView' : new FacetListView(),
        'peopleListView': new PeopleListView()
      };

      this.context = {};
    },
    render: function() {
      log('rendering loggedinview');
      dust.render(templateName, this.context, this.onDustRendered);
    },
    onDustRendered: function(err, out) {
      this.el.html(out);
      
      this.views['headView'].el = $('#head-view', this.el);
      this.views['headView'].render();

      this.views['facetListView'].el = $('#facet-list-view', this.el);
      this.views['facetListView'].render();

      this.views['statusView'].el = $('#status-view', this.el);
      this.views['statusView'].render();

      this.views['peopleListView'].el = $('#people-list-view', this.el);
      this.views['peopleListView'].render();
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