define(function(require) {
  var SignInView          = require('views/SignInView'),
      LoggedInView        = require('views/LoggedInView'),      
      peopleSearch        = require('search/peoplesearch'),
      peopleSearchInput   = require('models/peopleSearchInput'),
      channel             = require('util/channel');  
  
  var views = {};
  
  //Initialize the application
  function initialize() {        
    
    views['sign-in']    = new SignInView();
    views['logged-in']  = new LoggedInView();   
    
    //Check if user is already logged in to LinkedIn and authorized for our app
    IN.Event.on(IN, 'frameworkLoaded', function() {
      if(IN.User.isAuthorized()) {
        onLinkedInAuth();
      } else {
        views['sign-in'].render();
      }
    });

    //Get notified when the user authorizes our app on LinkedIn
    IN.Event.on(IN, 'auth', onLinkedInAuth);
    
  }

  //Render logged-in view
  function onLinkedInAuth() {
    var hash = window.location.search.replace('?', '');
    var facets = ['location', 'industry', 'current-company'];
    var parts = hash.split('&');
    var urlParams = {};


    var pastCompanies = [];
    var currentCompanies = [];
    var school = [];

    // Split key/values from hash
    for(var i = 0, len = parts.length; i < len; i++) {
      var pair = parts[i].split('=');
      urlParams[pair[0]] = pair[1];
    }

    if(urlParams.facets) {
      facets = urlParams.facets.split(',');
    }

    if(urlParams['past-company']) {
      pastCompanies = urlParams['past-company'].split(',');      
    }

    if(urlParams['current-company']) {
      currentCompanies = urlParams['current-company'].split(',');      
    }

    if(urlParams['school']) {
      school = urlParams['school'].split(',');      
    }


    peopleSearchInput.addFacets(facets, true);
    peopleSearchInput.set({      
      'cohorts-past-company'  : pastCompanies,
      'cohorts-current-company': currentCompanies,
      'cohorts-school':school,
      'keywords'              : '',
      'sort'                  : 'distance'
    }); 

    var fields = ['firstName', 'headline', 'positions:(company)'];

    IN.API.Profile('me')
      .fields(fields)
      .result(function(data) {
        channel.pub('auth', 'user-data', data.values[0]);

        views['sign-in'].unrender();
        views['logged-in'].render();
      });
  }

  return {
    initialize: initialize
  };
});