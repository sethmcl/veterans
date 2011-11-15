define(function(require) {
  var SearchInput = Backbone.Model.extend({
    defaults: {
      'keywords'                :   null,
      'first-name'              :   null,
      'last-name'               :   null,
      'company-name'            :   null,
      'current-company'         :   null,
      'title'                   :   null,
      'current-title'           :   null,
      'school-name'             :   null,
      'current-school'          :   null,
      'country-code'            :   null,
      'postal-code'             :   null,
      'distance'                :   null,
      'facets'                  :   [],
      'cohorts-location'        :   [],
      'cohorts-industry'        :   [],
      'cohorts-network'         :   [],
      'cohorts-language'        :   [],
      'cohorts-current-company' :   [],
      'cohorts-past-company'    :   [],
      'cohorts-school'          :   []               
    },

    initialize: function() {
      _.bindAll(this, 'addCohort');
    },

    addCohort: function(type, value) {
      var key     = 'cohorts-'+type;
      var values  = this.get(key);
      var data    = {};

      if(values) {
        if(values.push && values.indexOf(value) === -1) {
          values.push(value);          
          data[key] = values;          
          this.set(data);
          this.trigger('change');
        }
      }

      return this;
    },

    removeCohort: function(type, value) {
      var key     = 'cohorts-'+type;
      var values  = this.get(key);
      var data    = {};
      var idx;

      if((idx = values.indexOf(value)) !== -1) {
        values.splice(idx, 1);
        data[key] = values;
        this.set(data);
        this.trigger('change');
      }

      return this;
    },

    addFacets: function(facets) {
      var key    =  'facets';
      var values =  this.get(key);
      var data   =  {};
      var dirty  =  false;

      _.each(facets, function(facetName) {
        if(values.indexOf(facetName) === -1) {
          values.push(facetName);        
          dirty = true;
        }  
      });

      if(dirty) {
        data[key] = values;
        this.set(data);
        this.trigger('change');
      }
      
      return this;
    },

    removeFacet: function(facetName) {
      var key    =  'facets';
      var values =  this.get(key);
      var data   =  {};
      var idx;

      if((idx = values.indexOf(facetName)) !== -1) {
        values.splice(idx, 1);
        data[key] = values;
        this.set(data);
        this.trigger('change');
      }

      return this;
    }
  });

  return new SearchInput();
});