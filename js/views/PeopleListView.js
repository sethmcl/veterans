define(function(require) {
  var templateName          = 'PeopleListView';
  var templateMarkup        = require('text!templates/PeopleListView.dust');
  var peopleSearchResults   = require('models/peopleSearchResults');
  var channel               = require('util/channel');
  var PeopleCardView        = require('views/PeopleCardView');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({
    el: $('body'),    
    events: {
      'click #show-more'    :   'getMorePeopleResults'      
    },
    initialize: function() {
      _.bindAll(
        this, 
        'render', 
        'unrender', 
        'onSearchReturned', 
        'onSearchBegin',
        'dustCb',
        'getMorePeopleResults');    

      this.context = {};
      this.peopleCardViews = [];
      
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

      _.each(this.peopleCardViews, function(view) {
        view.renderAsync(function(vEl) {
          ul.append(vEl);
        });
      });    
    },
    unrender: function() {
      $(this.el).remove();
      return this;
    },
    onSearchReturned: function() {
      
      var data    = peopleSearchResults.toJSON();
      var people  = data.people;
      var hasMore = data.hasMore;
      var peopleCard;

      var ul = $('ul', this.el);

      this.peopleCardViews = [];
      ul.html('');

      _.each(people, function(person) {
        peopleCard = new PeopleCardView();
        peopleCard.context.person = person;
        peopleCard.renderAsync(function(vEl) {
          ul.append(vEl);
        });
      });

      if(hasMore) {
        $('#show-more', this.el).addClass('active');
      } else {
        $('#show-more', this.el).removeClass('active');
      }
      
      //  _.each(this.peopleCardViews, function(view) {
      //   view.renderAsync(function(vEl) {
      //     ul.append(vEl);
      //   });
      // });

    },
    onSearchBegin: function() {
      
    },
    getMorePeopleResults: function() {
      channel.pub('search', 'get-more-people');
    }
  });
});