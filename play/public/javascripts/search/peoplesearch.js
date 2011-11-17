define(function(require) {
  var channel         = require('util/channel');
  var searchInput     = require('models/peopleSearchInput');
  var searchResults   = require('models/peopleSearchResults');
  var self            = {};

  var baseUrl         = [ '/people-search:(', 
                          'people:(id,first-name,last-name,picture-url,',
                            'headline,industry,location,public-profile-url,distance)',
                          ',facets:(name,code,buckets:(name,code,count,selected))',
                          ')?'
                        ].join('');

  //watch the input for changes
  searchInput.bind('change', executeSearch);  

  function executeSearch() {
    var requestUrl = buildRequestUrl();

    channel.pub('search', 'search-begin');

    if(window.IN && IN.API && IN.API.Raw) {
      IN
        .API
        .Raw()
        .url(requestUrl)
        .method('GET')
        .result(onSearchResults)
        .error(onSearchError);
    }    
  }

  function onSearchResults(results) {
    var facets = [];
    var people = [];

    _.each(results.facets.values, function(facet) {
      facets.push(facet);
    });

    _.each(results.people.values, function(person) {
      people.push(person);
    });

    searchResults.setFacets(facets);

    (results.people['_start'] === 0) ? 
      searchResults.setPeople(people) : 
      searchResults.appendPeople(people);

    channel.pub('search', 'search-returned');
  }

  function onSearchError() {
    channel.pub('search', 'search-returned');
  }

  function buildRequestUrl() {
    var url = baseUrl;
    
    url = addStringValue(url,   'keywords');
    url = addStringValue(url,   'first-name');
    url = addStringValue(url,   'last-name');
    url = addStringValue(url,   'company-name');
    url = addBooleanValue(url,  'current-company');
    url = addStringValue(url,   'title');
    url = addBooleanValue(url,  'current-title');
    url = addStringValue(url,   'school-name');
    url = addBooleanValue(url,  'current-school');
    url = addStringValue(url,   'country-code');
    url = addStringValue(url,   'postal-code');
    url = addStringValue(url,   'distance');
    url = addArrayValue(url,    'facets');

    url = addCohortValue(url,   'cohorts-location',         'location');
    url = addCohortValue(url,   'cohorts-industry',         'industry');
    url = addCohortValue(url,   'cohorts-network',          'network');
    url = addCohortValue(url,   'cohorts-language',         'language');
    url = addCohortValue(url,   'cohorts-current-company',  'current-company');
    url = addCohortValue(url,   'cohorts-past-company',     'past-company');
    url = addCohortValue(url,   'cohorts-school',           'school');

    return url;

    function addCohortValue(url, modelKey, cohortName) {
      var value = searchInput.get(modelKey);

      if(typeof value === 'object' && value !== null && value.length && value.length > 0) {
        url += 'facet' + '=' + cohortName + ',' + value.join(',') + '&';
      }

      return url;
    }

    function addStringValue(url, modelKey, apiKey) {
      var apiKey  =   apiKey || modelKey;
      var value   =   searchInput.get(modelKey);

      if(typeof value !== 'undefined' && value !== null) {
        url += apiKey + '=' + value + '&';
      }

      return url;
    }

    function addBooleanValue(url, modelKey, apiKey) {
      var apiKey  =   apiKey || modelKey;
      var value   =   searchInput.get(modelKey);

      if(typeof value !== 'undefined' && value !== null) {
        url += apiKey + '=' + (Boolean(value)).toString() + '&';
      }

      return url;
    }

    function addArrayValue(url, modelKey, apiKey) {
      var apiKey  = apiKey || modelKey;
      var value   = searchInput.get(modelKey);

      if(typeof value === 'object' && value !== null && value.length && value.length > 0) {
        url += apiKey + '=' + value.join(',') + '&';
      }

      return url;
    }
  }  

  return self;
});