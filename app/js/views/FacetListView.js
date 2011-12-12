define(function(require) {
  var templateName          = 'FacetListView';
  var templateMarkup        = require('text!templates/FacetListView.dust');
  var peopleSearchResults   = require('models/peopleSearchResults');
  var channel               = require('util/channel');
  var FacetView             = require('views/FacetView');

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
        'dustCb');    

      this.context = {
        firstName: null
      };

      this.rendered = false;
      this.facetViews = [ new FacetView(), new FacetView(), new FacetView() ];

      channel.sub('search', 'search-returned', this.onSearchReturned);  
      channel.sub('search', 'search-begin', this.onSearchBegin);        
    },    
    render: function() {    
      if(this.rendered) return this;
      this.rendered = true;  
      dust.render(templateName, this.context, this.dustCb);
      return this;
    },
    dustCb: function(err, out) {
      $(this.el).html(out);
      var ul = $('ul', this.el);

      _.each(this.facetViews, function(view) {
        ul.append(view.render().el);
      });    
    },
    unrender: function() {
      $(this.el).remove();
      return this;
    },
    onSearchReturned: function() {
      var facets = peopleSearchResults.get('facets');
      var facet;

      _.each(this.facetViews, function(view, idx) {
        facet = facets[idx];

        if(facet) {
          view.update(facet);
        }
      }); 

    },
    onSearchBegin: function() {
      
    }
  });
});