define(function(require) {
  var templateName          = 'PeopleListView';
  var templateMarkup        = require('text!templates/PeopleListView.dust');
  var peopleSearchResults   = require('models/peopleSearchResults');
  var channel               = require('util/channel');
  var PeopleCardView        = require('views/PeopleCardView');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({    
    events: {},
    initialize: function() {
      _.bindAll(
        this, 
        'render', 
        'unrender', 
        'onSearchReturned', 
        'onSearchBegin',
        'dustCb');    

      this.context = {};
      
      channel.sub('search', 'search-returned', this.onSearchReturned);  
      channel.sub('search', 'search-begin', this.onSearchBegin);        
    },    
    render: function() {      
      dust.render(templateName, this.context, this.dustCb);
      return this;
    },
    dustCb: function(err, out) {
      this.el.html(out);
      var ul = $('ul', this.el);

      // _.each(this.facetViews, function(view) {
      //   view.renderAsync(function(vEl) {
      //     ul.append(vEl);
      //   });
      // });    
    },
    unrender: function() {
      $(this.el).remove();
      return this;
    },
    onSearchReturned: function() {
      var people = peopleSearchResults.get('people');
      var person;

      // _.each(this.facetViews, function(view, idx) {
      //   facet = facets[idx];

      //   if(facet) {
      //     view.update(facet);
      //   }
      // }); 

    },
    onSearchBegin: function() {
      
    }
  });
});