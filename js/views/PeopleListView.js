define(function(require) {
  var templateName          = 'PeopleListView';
  var templateMarkup        = require('text!templates/PeopleListView.dust');
  var peopleSearchResults   = require('models/peopleSearchResults');
  var channel               = require('util/channel');
  var PeopleCardView        = require('views/PeopleCardView');

  dust.loadSource(dust.compile(templateMarkup, templateName));

  return Backbone.View.extend({
    tagName: 'div',        
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
      $(this.el).html(out);
      
      var ul = $('ul', this.el);

      _.each(this.peopleCardViews, function(view) {
        ul.append(view.render().el);
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

        switch(person.degree) {
          case 0:
            person['degreeMyself'] = true;
            break;
          case 1:
            person['degreeFirst'] = true;
            break;
          case 2:
            person['degreeSecond'] = true;
            break;
          case 3:
            person['degreeThird'] = true;
            break;
          default:
            person['degreeOon'] = true;
            break;
        }      
        
        ul.append(peopleCard.render().el);        
      });

      if(hasMore) {
        $('#show-more', this.el).addClass('active');
      } else {
        $('#show-more', this.el).removeClass('active');
      }
    },
    onSearchBegin: function() {
      
    },
    getMorePeopleResults: function() {
      channel.pub('search', 'get-more-people');
    }
  });
});