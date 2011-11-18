define(function(require) {
  var channel     = require('util/channel');

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
      'start'                   :   null,
      'count'                   :   null,
      'sort'                    :   null,
      'visibility'              :   'full',
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
      _.bindAll(
        this,
        'addCohort',
        'onAddBucket',
        'onRemoveBucket'
      );

      channel.sub('search', 'add-bucket', this.onAddBucket);
      channel.sub('search', 'remove-bucket', this.onRemoveBucket);
    },

    onAddBucket: function(e) {
      this.addCohort(e.data.facetCode, e.data.code);
    },

    onRemoveBucket: function(e) {
      this.removeCohort(e.data.facetCode, e.data.code);
    },

    addCohort: function(type, value) {
      var key     = 'cohorts-'+type;
      var values  = this.get(key);
      var data    = {};

      if(values) {
        if(values.push && values.indexOf(value) === -1) {
          values.push(value);          
          data[key] = values;     
          data.start = 0;               
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
        data.start = 0;
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