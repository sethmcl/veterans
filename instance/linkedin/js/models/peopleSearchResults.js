define(function(require) {
  var SearchResults = Backbone.Model.extend({
    defaults: {      
      'facets'      : [],
      'people'      : [],
      'peopleCount' : 0,
      'hasMore'     : false,
      'start'       : 0,
      'count'       : 0,
      'total'       : 0
    },

    setFacets: function(facets) {
      var data = { 'facets': facets };
      this.set(data);
      this.trigger('change');
    },

    setPeople: function(people) {
      var data = { 'people': people };
      this.set(data);
      this.trigger('change');
    },

    appendPeople: function(people) {
      var values = this.get('people');
      var data = { 'people' : [] };

      values = values.concat(people);
      data.people = values;

      this.set(data);
      this.trigger('change');
    }

  });

  return new SearchResults();
});