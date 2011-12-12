define(function(require) {
  var HeadView        = require('views/HeadView');
  var StatusView      = require('views/StatusView');
  var FacetListView   = require('views/FacetListView');
  var PeopleListView  = require('views/PeopleListView');
  var BucketBarView   = require('views/BucketBarView');
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
      
    },
    initialize: function(config) {
      _.bindAll(this, 'render', 'unrender', 'dustCb'); 
           
      this.views = {
        'statusView'    : new StatusView(),
        'headView'      : new HeadView(),
        'facetListView' : new FacetListView(),
        'peopleListView': new PeopleListView(),
        'bucketBarView' : new BucketBarView()
      };

      this.context = {};
    },
    render: function() {
      log('rendering loggedinview');

      dust.render(templateName, this.context, this.dustCb);
    },
    dustCb: function(err, out) {
      $(this.el).html(out);


      $('#head-view', this.el).html(this.views['headView'].render().el);
      $('#facet-list-view', this.el).html(this.views['facetListView'].render().el);
      $('#status-view', this.el).html(this.views['statusView'].render().el);
      $('#people-list-view', this.el).html(this.views['peopleListView'].render().el);
      $('#bucket-bar-view', this.el).html(this.views['bucketBarView'].render().el);
      /*
		console.log($('#people-list-view', this.el));
		console.log(this.views['peopleListView'].render().el);
		console.log(err);
		veteransOutputData = out;
		console.log("data stored in --> var veteransOutputData");
      */
    },    
    unrender: function() {
      $(this.el).remove();
    }
  });
});